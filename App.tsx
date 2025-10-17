import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import AiTutorView from './components/AiTutorView';
import Dashboard from './components/Dashboard';
import ProjectCard from './components/ProjectCard';
import ProfileView from './components/ProfileView';
import ShowcaseView from './components/ShowcaseView';
import AddProjectModal from './components/AddProjectModal';
import ShopView from './components/ShopView';
import DailyRewardModal from './components/DailyRewardModal';
import PromoVideoPlayer from './components/PromoVideoPlayer';
import SimulationView from './components/SimulationView';
import FlyingCoinEffect from './components/FlyingCoinEffect';
import { LESSONS, PROJECTS, BADGES, COINS_PER_LEVEL, LEARNING_PATHS, SHOWCASE_PROJECTS, SHOP_ITEMS, DAILY_QUESTS_POOL } from './constants';
import type { Lesson, Project, UserProfile, ShowcaseProject, ShopItem, DailyQuest } from './types';

type ViewType = 'dashboard' | 'lesson' | 'tutor' | 'projects' | 'profile' | 'showcase' | 'shop' | 'simulation';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    starCoins: 50, // Bắt đầu với một ít tiền
    level: 1,
    badges: [],
    purchasedItems: [],
    completedExercises: [],
    completedScenarios: [],
    dailyQuests: {
        date: '',
        quests: [],
    },
  });
  
  // State for Showcase
  const [showcaseProjects, setShowcaseProjects] = useState<ShowcaseProject[]>(SHOWCASE_PROJECTS);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  // State for Daily Reward
  const [isDailyRewardModalOpen, setIsDailyRewardModalOpen] = useState(false);
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);
  const DAILY_REWARD_AMOUNT = 25;

  // State for Promo Video
  const [showPromoVideo, setShowPromoVideo] = useState(false);

  // State for After Effects
  const [coinAnimations, setCoinAnimations] = useState<Array<{ id: number, startRect: DOMRect | null }>>([]);
  const coinTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenPromo = localStorage.getItem('hasSeenPromo');
    if (!hasSeenPromo) {
      setShowPromoVideo(true);
    }
    const today = new Date().toLocaleDateString();
    const storedLastLogin = localStorage.getItem('lastLoginDate');
    if (storedLastLogin !== today) {
      setIsDailyRewardModalOpen(true);
    }
    setLastLoginDate(storedLastLogin);
  }, []);
  
  // Daily Quests Logic
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (userProfile.dailyQuests?.date !== today) {
        const newQuests: typeof DAILY_QUESTS_POOL = [];
        const pool = [...DAILY_QUESTS_POOL];
        for (let i = 0; i < 3 && pool.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * pool.length);
            newQuests.push(pool.splice(randomIndex, 1)[0]);
        }
        
        setUserProfile(p => ({
            ...p,
            dailyQuests: {
                date: today,
                quests: newQuests.map(q => ({
                    questId: q.id,
                    progress: 0,
                    claimed: false,
                })),
            },
        }));
    }
  }, [userProfile.dailyQuests?.date]);

  const triggerCoinAnimation = (sourceRect: DOMRect | null) => {
    if (!coinTargetRef.current) return;
    const rect = sourceRect ?? coinTargetRef.current.getBoundingClientRect();
    setCoinAnimations(prev => [...prev, { id: Date.now(), startRect: rect }]);
  };

  const handleClosePromo = () => {
    setShowPromoVideo(false);
    localStorage.setItem('hasSeenPromo', 'true');
  };

  const handleClaimDailyReward = () => {
    const today = new Date().toLocaleDateString();
    setUserProfile(p => ({ ...p, starCoins: p.starCoins + DAILY_REWARD_AMOUNT }));
    localStorage.setItem('lastLoginDate', today);
    setLastLoginDate(today);
    setIsDailyRewardModalOpen(false);
  };

  const activeLesson = useMemo(() => {
    if (!activeLessonId) return null;
    return LESSONS.find(lesson => lesson.id === activeLessonId) || null;
  }, [activeLessonId]);
  
  const checkAndAwardBadges = useCallback((currentCompletedLessons: Set<string>, currentProfile: UserProfile) => {
    const newBadges = new Set(currentProfile.badges);
    if (currentCompletedLessons.size >= 1) newBadges.add('badge-1');
    if (currentCompletedLessons.size >= 5) newBadges.add('badge-2');
    const scratchLessons = LESSONS.filter(l => l.category === 'scratch');
    const roboticsLessons = LESSONS.filter(l => l.category === 'robotics');
    const basicScratch = scratchLessons.filter(l => l.difficulty === 'Cơ bản').map(l => l.id);
    if (basicScratch.every(id => currentCompletedLessons.has(id))) newBadges.add('badge-3');
    const basicRobotics = roboticsLessons.filter(l => l.difficulty === 'Cơ bản').map(l => l.id);
    if (basicRobotics.every(id => currentCompletedLessons.has(id))) newBadges.add('badge-4');
    if (scratchLessons.every(l => currentCompletedLessons.has(l.id))) newBadges.add('badge-5');
    if (roboticsLessons.every(l => currentCompletedLessons.has(l.id))) newBadges.add('badge-6');
    LEARNING_PATHS.forEach(path => {
      if (path.steps.every(step => currentCompletedLessons.has(step.id))) {
        newBadges.add(path.completionBadgeId);
      }
    });
    return newBadges.size > currentProfile.badges.length ? { ...currentProfile, badges: Array.from(newBadges) } : currentProfile;
  }, []);

  const updateQuestProgress = useCallback((type: DailyQuest['type'], value: number) => {
    setUserProfile(p => {
        if (!p.dailyQuests) return p;
        const newQuests = p.dailyQuests.quests.map(userQuest => {
            const questInfo = DAILY_QUESTS_POOL.find(q => q.id === userQuest.questId);
            if (questInfo && questInfo.type === type && !userQuest.claimed) {
                return { ...userQuest, progress: userQuest.progress + value };
            }
            return userQuest;
        });
        return { ...p, dailyQuests: { ...p.dailyQuests, quests: newQuests }};
    });
  }, []);

  const onEarnCoins = useCallback((amount: number, sourceRect: DOMRect | null) => {
    setUserProfile(prev => ({
        ...prev,
        starCoins: prev.starCoins + amount,
    }));
    triggerCoinAnimation(sourceRect);
    updateQuestProgress('earn_coins', amount);
  }, [updateQuestProgress]);
  
  const toggleLessonComplete = useCallback((lessonId: string, sourceRect: DOMRect | null) => {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson || completedLessons.has(lessonId)) return;

    setCompletedLessons(prev => new Set(prev).add(lessonId));
    onEarnCoins(lesson.xpValue, sourceRect);
    updateQuestProgress('complete_lessons', 1);
  }, [completedLessons, onEarnCoins, updateQuestProgress]);
  
  useEffect(() => {
    const newLevel = Math.floor(userProfile.starCoins / COINS_PER_LEVEL) + 1;
    setUserProfile(p => checkAndAwardBadges(completedLessons, { ...p, level: newLevel }));
  }, [userProfile.starCoins, completedLessons, checkAndAwardBadges]);
  
  const handleSelectLesson = (lessonId: string) => {
    setActiveView('lesson');
    setActiveLessonId(lessonId);
  };

  const handleSelectView = (view: ViewType) => {
    setActiveView(view);
    if (view !== 'lesson') {
       setActiveLessonId(null);
    }
  };
  
  const handleSelectPath = (pathId: string) => {
    const path = LEARNING_PATHS.find(p => p.id === pathId);
    if (!path) return;
    const firstUncompletedStep = path.steps.find(step => !completedLessons.has(step.id));
    handleSelectLesson(firstUncompletedStep ? firstUncompletedStep.id : path.steps[0].id);
  };

  const handleLikeProject = useCallback((projectId: string) => {
    setShowcaseProjects(prevProjects => 
        prevProjects.map(p => p.id === projectId ? { ...p, likes: likedProjects.has(projectId) ? p.likes - 1 : p.likes + 1 } : p)
    );
    setLikedProjects(prevLiked => {
        const newSet = new Set(prevLiked);
        newSet.has(projectId) ? newSet.delete(projectId) : newSet.add(projectId);
        return newSet;
    });
  }, [likedProjects]);

  const handleAddProject = useCallback((projectData: { title: string; description: string; imageUrl: string }) => {
    const newProject: ShowcaseProject = {
        id: `showcase-${Date.now()}`,
        ...projectData,
        authorName: `Học viên Cấp ${userProfile.level}`,
        authorLevel: userProfile.level,
        likes: 0,
    };
    setShowcaseProjects(prev => [newProject, ...prev]);
    setIsAddProjectModalOpen(false);
  }, [userProfile.level]);

  const handlePurchaseItem = useCallback((item: ShopItem) => {
    if (userProfile.starCoins >= item.price && !userProfile.purchasedItems.includes(item.id)) {
      setUserProfile(prev => ({
        ...prev,
        starCoins: prev.starCoins - item.price,
        purchasedItems: [
          ...prev.purchasedItems.filter(itemId => {
            const existingItem = SHOP_ITEMS.find(i => i.id === itemId);
            return existingItem?.type !== item.type;
          }),
          item.id,
        ],
      }));
    }
  }, [userProfile]);
  
  const handleCompleteExercise = useCallback((exerciseId: string, reward: number, sourceRect: DOMRect | null) => {
    if (userProfile.completedExercises.includes(exerciseId)) return;
    
    onEarnCoins(reward, sourceRect);
    setUserProfile(prev => ({
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId],
    }));
    updateQuestProgress('complete_exercises', 1);
  }, [userProfile.completedExercises, onEarnCoins, updateQuestProgress]);

  const handleCompleteScenario = useCallback((scenarioId: string, reward: number, sourceRect: DOMRect | null) => {
    if (userProfile.completedScenarios.includes(scenarioId)) return;
    
    onEarnCoins(reward, sourceRect);
    setUserProfile(prev => ({
         ...prev,
         completedScenarios: [...prev.completedScenarios, scenarioId]
     }));
    updateQuestProgress('run_simulations', 1);
  }, [userProfile.completedScenarios, onEarnCoins, updateQuestProgress]);

  const handleClaimQuest = useCallback((questId: string, reward: number) => {
    setUserProfile(p => {
        if (!p.dailyQuests) return p;
        const quest = p.dailyQuests.quests.find(q => q.questId === questId);
        const questInfo = DAILY_QUESTS_POOL.find(q => q.id === questId);
        
        if (quest && questInfo && !quest.claimed && quest.progress >= questInfo.target) {
            const newQuests = p.dailyQuests.quests.map(q => q.questId === questId ? { ...q, claimed: true } : q);
            triggerCoinAnimation(null);
            return {
                ...p,
                starCoins: p.starCoins + reward,
                dailyQuests: {
                    ...p.dailyQuests,
                    quests: newQuests,
                }
            }
        }
        return p;
    });
  }, []);

  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard completedLessons={completedLessons} userProfile={userProfile} onSelectPath={handleSelectPath} onSelectLesson={handleSelectLesson} onClaimQuest={handleClaimQuest} />;
      case 'profile': return <ProfileView userProfile={userProfile} allBadges={BADGES} />;
      case 'shop': return <ShopView userProfile={userProfile} shopItems={SHOP_ITEMS} onPurchase={handlePurchaseItem} />;
      case 'showcase': return <ShowcaseView projects={showcaseProjects} likedProjects={likedProjects} onLikeProject={handleLikeProject} onAddProject={() => setIsAddProjectModalOpen(true)} />;
      case 'simulation': return <SimulationView userProfile={userProfile} onCompleteScenario={handleCompleteScenario} />;
      case 'tutor': return <AiTutorView activeLesson={activeLesson} />;
      case 'projects': return (
          <div className="p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-teal-400 mb-6">Dự án Mẫu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map(project => <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />)}
            </div>
          </div>
        );
      case 'lesson': return activeLesson ? (
            <LessonView lesson={activeLesson} isCompleted={completedLessons.has(activeLesson.id)} onToggleComplete={toggleLessonComplete} completedExercises={userProfile.completedExercises} onCompleteExercise={handleCompleteExercise} onEarnCoins={onEarnCoins} />
        ) : <div className="p-8 text-center text-gray-400">Vui lòng chọn một bài học từ thanh bên.</div>;
      default: return <div className="p-8 text-center text-gray-400">Chào mừng đến với Trung tâm Học tập!</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900">
      {showPromoVideo && <PromoVideoPlayer onClose={handleClosePromo} />}
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar ref={coinTargetRef} onSelectLesson={handleSelectLesson} onSelectView={handleSelectView} activeView={activeView} activeLessonId={activeLessonId} completedLessons={completedLessons} userProfile={userProfile} />
        <main className="flex-1 overflow-y-auto bg-gray-900/70">
          {renderContent()}
        </main>
        {coinAnimations.map(anim => 
            <FlyingCoinEffect key={anim.id} startRect={anim.startRect!} targetRef={coinTargetRef} onComplete={() => setCoinAnimations(prev => prev.filter(a => a.id !== anim.id))} />
        )}
      </div>
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProject(null)}>
          <style>{`@keyframes modal-fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } @keyframes modal-slide-up { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }`}</style>
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700" onClick={handleModalContentClick} style={{ animation: 'modal-fade-in 0.2s ease-out, modal-slide-up 0.3s ease-out' }}>
            <div className="relative">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-64 object-cover rounded-t-xl" />
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 bg-gray-900/50 w-8 h-8 rounded-full text-white hover:bg-gray-900 transition-colors flex items-center justify-center text-xl" aria-label="Đóng">&times;</button>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
              <p className="text-gray-400 mb-6">{selectedProject.description}</p>
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 border-t border-gray-700 pt-6">Câu Lệnh Tham Khảo</h3>
              <div className="space-y-3">
                {selectedProject.codeBlocks.map((block, index) => <div key={index} className="font-mono bg-gray-900/70 border border-gray-600 px-4 py-2 rounded-lg text-cyan-300 shadow-sm">{block}</div>)}
              </div>
            </div>
          </div>
        </div>
      )}
      {isAddProjectModalOpen && <AddProjectModal onClose={() => setIsAddProjectModalOpen(false)} onSubmit={handleAddProject} />}
      {isDailyRewardModalOpen && <DailyRewardModal onClaim={handleClaimDailyReward} rewardAmount={DAILY_REWARD_AMOUNT} />}
    </div>
  );
};

export default App;