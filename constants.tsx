import type { Lesson, Project, Badge, LearningPath, ShowcaseProject, ShopItem, PracticeExercise, SimulationBlock, SimulationScenario, DailyQuest } from './types';
import { TrophyIcon, GameControllerIcon, CogIcon } from './components/icons';

export const COINS_PER_LEVEL = 100; // Đổi tên từ XP_PER_LEVEL

export const LESSONS: Lesson[] = [
  {
    id: 'scratch-1',
    title: 'Giới thiệu về Scratch',
    category: 'scratch',
    difficulty: 'Cơ bản',
    xpValue: 10,
    content: `Scratch là một ngôn ngữ lập trình trực quan, dựa trên khối lệnh, được phát triển bởi MIT Media Lab. Nó được thiết kế để giúp trẻ em và người mới bắt đầu học các khái niệm lập trình một cách thú vị và dễ hiểu.\n\nVới Scratch, bạn có thể tạo ra các câu chuyện tương tác, trò chơi và hoạt ảnh của riêng mình. Thay vì gõ các dòng mã phức tạp, bạn chỉ cần kéo và thả các khối lệnh đầy màu sắc lại với nhau như trò chơi xếp hình. Hãy thử nhấp vào khối này: [[say Hello! for (2) seconds]].\n\nCác khái niệm cơ bản bạn sẽ học bao gồm:\n- {{concept:Nhân vật (Sprites):Các đối tượng hoặc nhân vật bạn có thể lập trình.}}\n- {{concept:Sân khấu (Stage):Nền của dự án của bạn, nơi các nhân vật biểu diễn.}}\n- **Khối lệnh (Blocks):** Các lệnh để điều khiển nhân vật và sân khấu.\n- **Kịch bản (Scripts):** Chuỗi các khối lệnh được kết nối với nhau để tạo ra một hành động.\n\n((tip:Mỗi nhân vật có thể có nhiều kịch bản khác nhau chạy cùng một lúc! Điều này cho phép bạn tạo ra các hành động phức tạp.))`,
    references: [
        { title: 'Trang chủ chính thức của Scratch', url: 'https://scratch.mit.edu' },
        { title: 'Scratch Wiki - Bắt đầu', url: 'https://en.scratch-wiki.info/wiki/Getting_Started_with_Scratch' }
    ]
  },
  {
    id: 'scratch-2',
    title: 'Di chuyển và Vòng lặp',
    category: 'scratch',
    difficulty: 'Cơ bản',
    xpValue: 15,
    relatedProjects: ['proj-1'],
    content: `Một trong những điều đầu tiên bạn sẽ làm trong Scratch là làm cho nhân vật của mình di chuyển. Khối [[move (10) steps]] là một khởi đầu tuyệt vời. Bạn cũng có thể làm cho nó xoay, ví dụ như [[turn right (15) degrees]].\n\nĐể tạo ra các chuyển động phức tạp hơn hoặc lặp lại các hành động, chúng ta sử dụng vòng lặp. {{concept:Vòng lặp (Loop):Một cấu trúc cho phép bạn chạy một nhóm các khối lệnh nhiều lần mà không cần phải sao chép chúng.}}\n\nKhối "liên tục" sẽ chạy các khối lệnh bên trong nó mãi mãi cho đến khi bạn dừng chương trình.\n\n((tip:Bạn có thể đặt một khối 'đợi' bên trong vòng lặp để điều khiển tốc độ của hoạt ảnh hoặc chuyển động.))\n\nBây giờ, hãy thử sức với thử thách bên cạnh để xem bạn có thể làm cho chú mèo di chuyển theo vòng tròn không nhé!`,
    challenge: {
      description: 'Làm cho chú mèo di chuyển và xoay liên tục. Hãy thêm các khối từ Hộp công cụ vào kịch bản theo đúng thứ tự.',
      toolbox: ['liên tục', 'move (10) steps', 'turn right (15) degrees'],
      solution: ['liên tục', 'move (10) steps', 'turn right (15) degrees'],
      successMessage: 'Tuyệt vời! Bạn đã tạo ra một vòng lặp chuyển động thành công.'
    }
  },
   {
    id: 'scratch-3',
    title: 'Biến và Điều kiện',
    category: 'scratch',
    difficulty: 'Trung cấp',
    xpValue: 20,
    relatedProjects: ['proj-1', 'proj-5', 'proj-7'],
    content: `Cùng xem video giải thích về Biến trong Scratch nhé!\n\n{{video:Plv2g2022_j4}}\n\n**Biến (Variables)** giống như những chiếc hộp để lưu trữ thông tin. Bạn có thể lưu trữ điểm số, thời gian, hoặc tên người chơi. Bạn có thể tạo biến của riêng mình trong mục "Các biến số".\n\n**Điều kiện (Conditionals)** cho phép chương trình của bạn đưa ra quyết định. Khối "nếu...thì" là khối điều kiện phổ biến nhất. Nó kiểm tra xem một điều kiện có đúng hay không. Nếu đúng, nó sẽ chạy các khối lệnh bên trong.\n\n{{concept:Toán tử so sánh (Comparison Operators):Các khối hình lục giác dùng để so sánh hai giá trị (ví dụ: <, >, =). Chúng luôn trả về kết quả là đúng hoặc sai và được đặt trong ô điều kiện của khối 'nếu...thì'.}}\n\nVí dụ về tính điểm trong trò chơi:\n1. Tạo một biến có tên là "điểm".\n2. Khi trò chơi bắt đầu, sử dụng khối "đặt [điểm] thành 0".\n3. Khi nhân vật chạm vào một đồng xu, sử dụng khối "nếu <đang chạm [đồng xu]?> thì".\n4. Bên trong khối "nếu", đặt khối "thay đổi [điểm] một lượng (1)". Để làm cho trò chơi thú vị hơn, bạn có thể thêm khối [[go to random position]] để đồng xu di chuyển đến một vị trí ngẫu nhiên sau khi được thu thập.`
  },
  {
    id: 'scratch-4',
    title: 'Thêm hoạt ảnh chuyển động',
    category: 'scratch',
    difficulty: 'Trung cấp',
    xpValue: 20,
    content: `Để làm cho nhân vật của bạn trông sống động hơn, bạn có thể tạo hoạt ảnh bằng cách thay đổi trang phục (costumes) của nó.\n\n{{concept:Trang phục (Costumes):Các hình ảnh khác nhau của cùng một nhân vật. Chuyển đổi giữa chúng tạo ra hoạt ảnh, giống như lật các trang của một cuốn sổ lật (flipbook).}}\n\nMột nhân vật có thể có nhiều trang phục khác nhau, mỗi trang phục là một hình ảnh hơi khác một chút. Bằng cách chuyển đổi nhanh giữa các trang phục này, bạn sẽ tạo ra ảo giác về chuyển động.\n\n((tip:Việc thêm khối 'đợi (0.1) giây' sau khối 'trang phục kế tiếp' là rất quan trọng! Nếu không, hoạt ảnh sẽ chạy quá nhanh và bạn sẽ không nhìn thấy gì cả. Hãy thử nghiệm với các giá trị thời gian khác nhau.))\n\nCách tạo hoạt ảnh đi bộ đơn giản:\n1. Chọn một nhân vật có nhiều trang phục mô tả các giai đoạn đi bộ.\n2. Bắt đầu với khối 'khi bấm vào lá cờ xanh'.\n3. Sử dụng khối 'liên tục' để hoạt ảnh chạy không ngừng.\n4. Bên trong vòng lặp, đặt khối 'trang phục kế tiếp'.\n5. Thêm một khối 'đợi (0.1) giây'. Ngoài trang phục, bạn cũng có thể thay đổi giao diện của nhân vật bằng các hiệu ứng đồ họa. Hãy thử khối [[change color effect by (25)]] để xem điều gì xảy ra!`
  },
  {
    id: 'scratch-5',
    title: 'Sự kiện và Tin nhắn',
    category: 'scratch',
    difficulty: 'Trung cấp',
    xpValue: 25,
    relatedProjects: ['proj-3'],
    content: `Sự kiện (Events) là cách để khởi động các kịch bản. Khối "khi bấm vào lá cờ xanh" là sự kiện phổ biến nhất.\n\nMột công cụ mạnh mẽ khác là "tin nhắn" (broadcasting). Bạn có thể cho một nhân vật [[broadcast message1]] (phát đi tin nhắn 1). Các nhân vật khác (hoặc chính nhân vật đó) có thể có một kịch bản bắt đầu bằng "khi tôi nhận được [message1]".\n\n{{concept:Phát tin (Broadcasting):Một cách để các nhân vật gửi tín hiệu cho nhau mà không cần tương tác trực tiếp, giúp điều phối các hành động phức tạp. Giống như một người thông báo trên loa phát thanh, và tất cả mọi người đều có thể nghe và phản ứng.}}\n\nĐiều này cho phép các nhân vật giao tiếp và phối hợp với nhau. Ví dụ:\n- Khi người chơi đạt được một số điểm nhất định, nhân vật chính có thể phát một tin nhắn "Thắng cuộc!".\n- Một nhân vật khác nhận được tin nhắn này và hiển thị màn hình chiến thắng.\n- Việc này giúp tổ chức mã của bạn gọn gàng và tạo ra các trò chơi phức tạp.`
  },
  {
    id: 'scratch-6',
    title: 'Tạo khối tùy chỉnh (My Blocks)',
    category: 'scratch',
    difficulty: 'Nâng cao',
    xpValue: 30,
    content: `Khi dự án của bạn trở nên phức tạp, bạn có thể thấy mình lặp lại cùng một chuỗi các khối lệnh ở nhiều nơi. 'Khối của tôi' (My Blocks) cho phép bạn tạo ra các khối lệnh tùy chỉnh của riêng mình, giống như tạo ra các hàm trong các ngôn ngữ lập trình khác. Điều này giúp mã của bạn gọn gàng, dễ đọc và tái sử dụng hơn.\n\nĐể tạo một khối mới:\n1. Vào mục 'Khối của tôi' và nhấp vào 'Tạo một khối'.\n2. Đặt tên cho khối của bạn, ví dụ: 'vẽ hình vuông'. Bạn có thể thêm các 'đầu vào' (input) để truyền giá trị, chẳng hạn như kích thước của hình vuông.\n3. Định nghĩa chức năng của khối bằng cách kéo các khối lệnh khác vào bên dưới khối 'định nghĩa [tên khối]'.\n4. Bây giờ, bạn có thể sử dụng khối mới của mình ở bất kỳ đâu trong dự án, ví dụ như thế này: [[vẽ hình vuông]].\n\n((tip:Hãy tạo một 'Khối của tôi' khi bạn thấy mình phải sao chép và dán một nhóm các khối lệnh nhiều lần. Nó sẽ giúp dự án của bạn ngắn gọn và dễ quản lý hơn rất nhiều!))`
  },
    {
    id: 'scratch-7',
    title: 'Tạo bản sao (Cloning)',
    category: 'scratch',
    difficulty: 'Nâng cao',
    xpValue: 35,
    relatedProjects: ['proj-7'],
    content: `Cloning (tạo bản sao) là một tính năng cực kỳ mạnh mẽ trong Scratch, cho phép một nhân vật tự tạo ra các bản sao của chính nó. Hãy xem cách nó được dùng để tạo một cơn mưa thiên thạch!\n\n{{video:B55kI-aYp2A}}\n\nĐiều này rất hữu ích để tạo ra nhiều kẻ thù trong trò chơi, các viên đạn, hoặc các hiệu ứng đặc biệt như mưa rơi hay pháo hoa.\n\nCác khối lệnh chính:\n- **'khi tôi bắt đầu là một bản sao':** Kịch bản bên dưới khối này sẽ chỉ được thực thi bởi các bản sao, không phải nhân vật gốc.\n- **'tạo bản sao của [bản thân tôi]':** Nhân vật gốc sử dụng khối này để tạo một bản sao mới.\n- **'xóa bản sao này':** Một bản sao có thể tự xóa mình đi khi cần thiết (ví dụ: khi một viên đạn bay ra khỏi màn hình).\n\n((tip:Nhân vật gốc thường được ẩn đi! Nó chỉ đóng vai trò là 'nhà máy' sản xuất ra các bản sao. Mọi hành động sẽ do các bản sao thực hiện.))\n\nLưu ý rằng có một giới hạn khoảng 300 bản sao trong một dự án Scratch để đảm bảo hiệu suất.`
  },
  {
    id: 'scratch-8',
    title: 'Khối Cảm biến',
    category: 'scratch',
    difficulty: 'Trung cấp',
    xpValue: 20,
    content: `Các khối trong mục 'Cảm biến' (Sensing) cho phép dự án của bạn tương tác với người dùng và môi trường của nó. Chúng giúp làm cho các trò chơi và hoạt ảnh trở nên sống động và phản ứng nhanh hơn.\n\n{{concept:Cảm biến (Sensing):Là cách để chương trình của bạn "cảm nhận" được thế giới xung quanh nó, ví dụ như có đang chạm vào một màu sắc nào đó, hoặc người dùng có đang nhấn một phím nào không.}}\n\nMột vài khối cảm biến hữu ích:\n- **'đang chạm [con trỏ chuột]?':** Kiểm tra xem một nhân vật có đang chạm vào con trỏ chuột, một nhân vật khác, hoặc cạnh của sân khấu hay không.\n- **'phím [dấu cách] được bấm?':** Kiểm tra xem một phím cụ thể trên bàn phím có đang được nhấn hay không.\n- **'hỏi [Tên bạn là gì?] và đợi':** Cho phép bạn nhận đầu vào văn bản từ người dùng và lưu trữ nó trong khối 'trả lời'.\n- **'đặt lại đồng hồ bấm giờ':** Scratch có một bộ đếm thời gian tích hợp mà bạn có thể sử dụng để đo thời gian hoặc tạo các sự kiện dựa trên thời gian.`
  },
  {
    id: 'scratch-9',
    title: 'Làm việc với Âm thanh',
    category: 'scratch',
    difficulty: 'Trung cấp',
    xpValue: 20,
    content: `Âm thanh làm cho dự án của bạn trở nên sống động và hấp dẫn hơn rất nhiều! Scratch cung cấp một thư viện âm thanh phong phú và cho phép bạn tự thu âm hoặc tải lên các tệp âm thanh của riêng mình.\n\n{{concept:Khối Âm thanh:Các khối màu hồng tím cho phép bạn phát, dừng, thay đổi âm lượng và cao độ của âm thanh.}}\n\nBạn có thể thêm nhạc nền cho trò chơi bằng cách sử dụng khối [[play sound [nhạc nền] until done]] bên trong một vòng lặp 'liên tục'.\n\n((tip:Để tránh việc nhạc nền bị phát lại chồng chéo, hãy đảm bảo kịch bản nhạc nền của bạn chỉ chạy một lần khi bắt đầu, ví dụ, bên trong một sự kiện 'khi bấm vào lá cờ xanh' riêng biệt.))\n\nBạn cũng có thể tạo ra các nhạc cụ tương tác! Bằng cách sử dụng các khối 'khi bấm vào nhân vật này' và [[play drum for (0.25) beats]], bạn có thể biến các nhân vật thành một bộ trống điện tử.`,
    references: [
        { title: 'Khối Âm thanh - Scratch Wiki', url: 'https://en.scratch-wiki.info/wiki/Sound_Blocks' }
    ]
  },
  {
    id: 'scratch-10',
    title: 'Tương tác với Người dùng',
    category: 'scratch',
    difficulty: 'Cơ bản',
    xpValue: 15,
    content: `Làm cho dự án của bạn có thể điều khiển được là một phần quan trọng để tạo ra các trò chơi thú vị. Scratch giúp việc này trở nên rất dễ dàng!\n\n{{video:AY6b5A2oRzM}}\n\nCách phổ biến nhất là sử dụng khối sự kiện [[when space key pressed]]. Bạn có thể thay đổi 'dấu cách' thành bất kỳ phím nào khác, chẳng hạn như các phím mũi tên để điều khiển nhân vật.\n\n{{concept:Sự kiện Bàn phím:Các khối bắt đầu bằng 'khi phím...được bấm' cho phép bạn kích hoạt một kịch bản ngay lập tức khi người dùng nhấn một phím cụ thể.}}\n\nMột cách khác là sử dụng khối cảm biến [[key space pressed?]] bên trong một khối 'nếu...thì'. Cách này hữu ích khi bạn muốn kiểm tra xem một phím có đang được giữ hay không, phù hợp cho chuyển động liên tục.\n\n((tip:Bạn cũng có thể làm cho nhân vật đi theo con trỏ chuột bằng cách sử dụng khối [[go to mouse-pointer]] bên trong một vòng lặp 'liên tục'. Hãy thử xem!))`,
    challenge: { 
      description: 'Làm cho chú mèo nhảy lên khi người dùng nhấn phím cách. Gợi ý: bạn cần di chuyển chú mèo lên rồi lại đi xuống.', 
      toolbox: ['when space key pressed', 'change y by (50)', 'wait (0.5) seconds', 'change y by (-50)'], 
      solution: ['when space key pressed', 'change y by (50)', 'wait (0.5) seconds', 'change y by (-50)'], 
      successMessage: 'Tuyệt vời! Chú mèo của bạn đã nhảy lên! Bạn đã tạo ra một hành động tương tác thành công.' 
    }
  },
  {
    id: 'scratch-11',
    title: 'Nghệ thuật với Lệnh Bút vẽ',
    category: 'scratch',
    difficulty: 'Trung cấp',
    xpValue: 25,
    relatedProjects: ['proj-11'],
    content: `Hãy khám phá tiện ích Bút vẽ (Pen) để biến nhân vật của bạn thành một họa sĩ! Tiện ích này cho phép bạn vẽ các đường thẳng và hình dạng trên Sân khấu.\n\nĐể bắt đầu, bạn cần thêm tiện ích Bút vẽ vào dự án của mình. Sau đó, bạn sẽ có các khối lệnh mới:\n- [[pen down]]: Bắt đầu vẽ. Khi nhân vật di chuyển, nó sẽ để lại một vệt mực phía sau.\n- [[pen up]]: Ngừng vẽ. Nhân vật có thể di chuyển mà không để lại dấu vết.\n- [[set pen color to [#ff0000]]]]: Thay đổi màu của bút vẽ.\n- [[set pen size to (5)]]: Điều chỉnh độ dày của nét vẽ.\n- [[erase all]]: Xóa tất cả các nét vẽ trên Sân khấu.\n\n{{concept:Nghệ thuật Đệ quy (Recursive Art):Bạn có thể sử dụng các khối tùy chỉnh (My Blocks) để tạo ra các hình dạng phức tạp. Một khối có thể gọi chính nó để vẽ các phiên bản nhỏ hơn của cùng một hình dạng, tạo ra các mẫu hình fractal tuyệt đẹp.}}\n\n((tip:Hãy kết hợp các khối Bút vẽ với các vòng lặp để tạo ra các hình đa giác hoặc các mẫu hình xoắn ốc một cách dễ dàng. Ví dụ, để vẽ một hình vuông, bạn có thể lặp lại 4 lần khối 'di chuyển' và 'xoay 90 độ'.))`
  },
  {
    id: 'scratch-12',
    title: 'Vật lý trong Game - Trọng lực',
    category: 'scratch',
    difficulty: 'Nâng cao',
    xpValue: 30,
    relatedProjects: ['proj-7'],
    content: `Để làm cho các trò chơi platformer trở nên chân thực hơn, chúng ta cần mô phỏng trọng lực. Điều này nghe có vẻ phức tạp, nhưng lại khá đơn giản với các biến số!\n\n{{video:wolJ_V2_5kI}}\n\nCách hoạt động:\n1. Tạo một biến có tên là 'vận tốc y' (hoặc 'gravity'). Biến này sẽ theo dõi tốc độ rơi của nhân vật.\n2. Bắt đầu một vòng lặp 'liên tục'.\n3. Bên trong vòng lặp, [[change y by (vận tốc y)]]. Điều này làm cho nhân vật di chuyển theo phương thẳng đứng.\n4. Ngay sau đó, [[change [vận tốc y] by (-1)]]. Điều này liên tục kéo nhân vật xuống dưới, mô phỏng trọng lực.\n\n{{concept:Phát hiện va chạm (Collision Detection):Để nhân vật không bị rơi xuyên qua mặt đất, chúng ta cần kiểm tra xem nó có đang chạm vào nền tảng hay không. Nếu có, chúng ta đặt 'vận tốc y' thành 0 để nó dừng lại.}}\n\nĐể làm cho nhân vật nhảy, khi người dùng nhấn phím mũi tên lên, bạn chỉ cần [[set [vận tốc y] to (15)]]. Trọng lực sẽ tự động kéo nó trở lại mặt đất.`
  },
  {
    id: 'scratch-13',
    title: 'Làm việc với Danh sách',
    category: 'scratch',
    difficulty: 'Trung cấp',
    xpValue: 25,
    relatedProjects: ['proj-9'],
    content: `Danh sách (Lists) là một loại biến đặc biệt có thể chứa nhiều giá trị cùng một lúc. Hãy coi nó như một tủ có nhiều ngăn kéo, mỗi ngăn chứa một thông tin.\n\nBạn có thể sử dụng danh sách để lưu trữ:\n- Một danh sách các câu hỏi và câu trả lời cho một trò chơi đố vui.\n- Túi đồ của một nhân vật trong game nhập vai.\n- Tọa độ các điểm để nhân vật đi theo một lộ trình cụ thể.\n- Bảng xếp hạng điểm cao.\n\nCác khối lệnh chính cho danh sách:\n- [[add [thing] to [my list]]]: Thêm một mục mới vào cuối danh sách.\n- [[delete (1) of [my list]]]: Xóa một mục tại một vị trí cụ thể.\n- [[item (1) of [my list]]]: Lấy giá trị của một mục tại một vị trí nhất định.\n- [[length of [my list]]]: Cho biết có bao nhiêu mục trong danh sách.\n\n((tip:Số chỉ mục (index) của danh sách trong Scratch bắt đầu từ 1, không phải 0 như trong nhiều ngôn ngữ lập trình khác!))`
  },
  {
    id: 'robotics-1',
    title: 'Giới thiệu về Robotics',
    category: 'robotics',
    difficulty: 'Cơ bản',
    xpValue: 10,
    content: `Robotics là một lĩnh vực kỹ thuật và khoa học máy tính liên quan đến việc thiết kế, chế tạo, vận hành và sử dụng robot. Hãy xem video giới thiệu ngắn này!\n\n{{video:sJVQJ4-I8eA}}\n\nMột robot thường bao gồm ba phần chính:\n- {{concept:Cảm biến (Sensors):Giúp robot nhận biết về môi trường xung quanh (ví dụ: cảm biến khoảng cách, cảm biến ánh sáng, cảm biến va chạm).}}\n- {{concept:Bộ xử lý (Processor):"Bộ não" của robot, thường là một vi điều khiển (như Arduino) để xử lý thông tin và ra quyết định.}}\n- {{concept:Cơ cấu chấp hành (Actuators):Các bộ phận giúp robot di chuyển hoặc tương tác với môi trường (ví dụ: [[motor_run]], [[servo_turn]], đèn LED).}}\n\nLập trình robot liên quan đến việc viết mã để đọc dữ liệu từ cảm biến và điều khiển các cơ cấu chấp hành dựa trên dữ liệu đó.`,
    references: [
        { title: 'Robotics là gì? - Wikipedia', url: 'https://vi.wikipedia.org/wiki/Robotics' },
        { title: 'Giới thiệu về Robotics cho trẻ em', url: 'https://www.autodesk.com/bot-academy/introduction-to-robotics' }
    ]
  },
  {
    id: 'robotics-2',
    title: 'Động cơ và Cảm biến',
    category: 'robotics',
    difficulty: 'Cơ bản',
    xpValue: 15,
    relatedProjects: ['proj-2'],
    content: `**Động cơ DC (DC Motors)** là loại động cơ phổ biến nhất để tạo ra chuyển động quay, chẳng hạn như làm quay bánh xe. Bạn có thể điều khiển tốc độ và hướng quay của chúng. Hãy thử [[motor_run]]!\n\n**Động cơ Servo (Servo Motors)** cho phép điều khiển chính xác vị trí góc. Chúng rất hữu ích để tạo ra các chuyển động như cánh tay robot, tay lái hoặc cửa. Xem nó hoạt động: [[servo_turn]].\n\n{{concept:Cảm biến siêu âm (Ultrasonic Sensors):Đo khoảng cách bằng cách phát ra sóng âm và đo thời gian sóng âm phản xạ lại. Chúng rất tốt để giúp robot tránh chướng ngại vật. Nhấp để xem mô phỏng: [[detect_obstacle]].}}\n\n((tip:Sóng siêu âm có thể không hoạt động tốt trên các bề mặt mềm hoặc góc cạnh, vì chúng hấp thụ hoặc làm chệch hướng sóng âm!))\n\n**Cảm biến dò đường (Line Follower Sensors)** sử dụng tia hồng ngoại để phát hiện các vạch tối trên bề mặt sáng (hoặc ngược lại). Đây là thành phần chính của robot dò đường.`
  },
  {
    id: 'robotics-3',
    title: 'Sử dụng cảm biến màu sắc',
    category: 'robotics',
    difficulty: 'Trung cấp',
    xpValue: 25,
    content: `Cảm biến màu sắc là một thiết bị điện tử có thể phát hiện màu sắc của một vật thể ở phía trước nó. Nó hoạt động bằng cách chiếu ánh sáng trắng lên bề mặt và đo lượng ánh sáng phản xạ lại. Hãy xem cách nó hoạt động: [[detect_color]].\n\n{{video:U5N4F2g_P34}}\n\nCác ứng dụng phổ biến:\n- **Robot dò đường theo vạch màu:** Thay vì chỉ đi theo vạch đen, robot có thể được lập trình để đi theo các vạch màu khác nhau.\n- **Robot phân loại:** Robot có thể nhặt các vật thể và sắp xếp chúng vào các thùng khác nhau dựa trên màu sắc của chúng.\n- **Giải mã:** Robot có thể đọc một chuỗi các ô màu trên sàn để nhận chỉ dẫn.\n\n((tip:Ánh sáng môi trường có thể ảnh hưởng đến độ chính xác của cảm biến màu. Trong các cuộc thi, người ta thường che cảm biến lại để tránh ánh sáng bên ngoài gây nhiễu!))\n\nKhi lập trình, bạn thường đọc giá trị từ cảm biến và sử dụng các khối điều kiện (nếu...thì) để robot đưa ra quyết định dựa trên màu sắc được phát hiện. Ví dụ: 'Nếu cảm biến phát hiện màu đỏ, hãy rẽ trái'.`
  },
  {
    id: 'robotics-4',
    title: 'Xây dựng Robot dò đường',
    category: 'robotics',
    difficulty: 'Trung cấp',
    xpValue: 25,
    relatedProjects: ['proj-4'],
    content: `Robot dò đường là một dự án kinh điển cho người mới bắt đầu. Mục tiêu là làm cho robot tự động đi theo một vạch đen trên nền trắng. Hãy xem một ví dụ thực tế!\n\n{{video:qYm3W3g3K9g}}\n\n{{concept:Thuật toán dò đường (Line Following Algorithm):Một bộ quy tắc logic mà robot sử dụng để đưa ra quyết định (rẽ trái, rẽ phải, đi thẳng) dựa trên dữ liệu từ cảm biến để bám theo vạch kẻ.}}\n\nRobot cần ít nhất hai cảm biến dò đường, một cái đặt ở bên trái và một cái ở bên phải vạch đen. Logic cơ bản là:\n- Nếu cả hai cảm biến đều thấy màu trắng, robot đi thẳng.\n- Nếu cảm biến bên phải thấy vạch đen, nghĩa là robot đang đi chệch sang trái. Nó cần phải rẽ phải để quay lại vạch.\n- Nếu cảm biến bên trái thấy vạch đen, nghĩa là robot đang đi chệch sang phải. Nó cần phải rẽ trái.\n\n((tip:Để robot đi mượt hơn, thay vì rẽ gấp, bạn có thể chỉ cần giảm tốc độ của một bánh xe. Ví dụ, để rẽ phải, hãy giữ bánh phải chạy chậm và bánh trái chạy nhanh.))\n\nBằng cách liên tục thực hiện các điều chỉnh nhỏ này, robot có thể đi theo vạch một cách trơn tru. Xem mô phỏng: [[follow_line]].`
  },
  {
    id: 'robotics-5',
    title: 'Lập trình Cánh tay Robot',
    category: 'robotics',
    difficulty: 'Nâng cao',
    xpValue: 35,
    relatedProjects: ['proj-6'],
    content: `Cánh tay robot là một ứng dụng tuyệt vời của động cơ servo. Bằng cách kết hợp nhiều động cơ servo, chúng ta có thể tạo ra các khớp nối cho phép cánh tay di chuyển và gắp vật thể với độ chính xác cao.\n\nMột cánh tay robot đơn giản thường có:\n- **Đế xoay (Base):** Một servo để xoay toàn bộ cánh tay.\n- **Vai (Shoulder):** Một servo để nâng và hạ cánh tay.\n- **Khuỷu tay (Elbow):** Một servo khác để gập và duỗi cánh tay.\n- **Bàn kẹp (Gripper):** Một servo để đóng và mở bàn kẹp. Hãy xem nó hoạt động: [[gripper_action]].\n\n{{concept:Động học nghịch (Inverse Kinematics):Là một bài toán tính toán các góc cần thiết cho mỗi khớp của robot để đầu cuối của nó (bàn kẹp) có thể đạt đến một vị trí và hướng mong muốn trong không gian.}}\n\nViệc lập trình bao gồm việc gửi các lệnh góc cụ thể đến từng servo một cách phối hợp để tạo ra chuyển động mượt mà. Đây là một lĩnh vực rất thú vị trong robotics!`
  },
  {
    id: 'robotics-6',
    title: 'Giao tiếp không dây (Bluetooth)',
    category: 'robotics',
    difficulty: 'Nâng cao',
    xpValue: 30,
    relatedProjects: ['proj-8'],
    content: `Giao tiếp không dây cho phép robot của bạn nhận lệnh từ xa, ví dụ như từ một chiếc điện thoại thông minh hoặc máy tính. Bluetooth là một công nghệ phổ biến cho mục đích này. Video này sẽ cho bạn thấy cách kết nối module Bluetooth.\n\n{{video:wAPkE423o20}}\n\nCách hoạt động:\n1. Một module Bluetooth được kết nối với bộ vi điều khiển của robot.\n2. Một ứng dụng trên điện thoại hoặc chương trình trên máy tính sẽ gửi các ký tự hoặc chuỗi lệnh qua Bluetooth (ví dụ: 'F' để đi thẳng, 'L' để rẽ trái).\n3. Bộ vi điều khiển của robot đọc dữ liệu này và thực thi lệnh tương ứng, chẳng hạn như điều khiển động cơ.\n\nViệc này mở ra khả năng tạo ra các robot điều khiển từ xa, các thiết bị IoT đơn giản và nhiều ứng dụng tương tác khác.`
  },
  {
    id: 'robotics-7',
    title: 'Kết hợp nhiều cảm biến',
    category: 'robotics',
    difficulty: 'Nâng cao',
    xpValue: 40,
    relatedProjects: ['proj-10'],
    content: `Để tạo ra một robot thực sự "thông minh", chúng ta thường cần kết hợp thông tin từ nhiều loại cảm biến khác nhau. Một robot có thể ra quyết định tốt hơn nếu nó có thể "nhìn", "cảm nhận" và "đo lường" môi trường của nó cùng một lúc.\n\n((tip:Việc kết hợp dữ liệu từ nhiều cảm biến được gọi là 'sensor fusion' (hợp nhất cảm biến). Đây là một kỹ thuật quan trọng để tạo ra các robot tự hành đáng tin cậy.))\n\nVí dụ về một robot giải mê cung:\n- Nó có thể sử dụng **cảm biến siêu âm** ở phía trước để kiểm tra xem có tường cản hay không.\n- Đồng thời, nó sử dụng một **cảm biến hồng ngoại** ở bên cạnh để bám theo một bức tường.\n- Nó có thể sử dụng một **cảm biến màu sắc** hướng xuống dưới để phát hiện vạch đích.\n\nBằng cách viết mã để xử lý tất cả các đầu vào này, bạn có thể lập trình cho robot các hành vi phức tạp và khả năng tự hành để giải quyết các vấn đề như điều hướng trong một mê cung.`
  },
  {
    id: 'robotics-8',
    title: 'Điều khiển PID',
    category: 'robotics',
    difficulty: 'Nâng cao',
    xpValue: 40,
    content: `Khi bạn muốn robot thực hiện các tác vụ một cách chính xác và ổn định, ví dụ như giữ thăng bằng hoặc đi theo vạch kẻ một cách siêu mượt, chúng ta cần một thuật toán điều khiển thông minh hơn. Đó là lúc PID xuất hiện!\n\n{{video:UOu3kfX_56A}}\n\nPID là viết tắt của Proportional (Tỷ lệ), Integral (Tích phân), và Derivative (Vi phân). Đây là một cơ chế phản hồi vòng lặp liên tục tính toán "giá trị lỗi" và cố gắng giảm thiểu lỗi đó.\n\n- {{concept:P (Tỷ lệ):Phản ứng với lỗi hiện tại. Lỗi càng lớn, sự điều chỉnh càng mạnh.}}\n- {{concept:I (Tích phân):Loại bỏ sai số tích lũy theo thời gian. Nó giúp robot đạt được chính xác mục tiêu thay vì chỉ đến gần nó.}}\n- {{concept:D (Vi phân):Dự đoán lỗi trong tương lai dựa trên tốc độ thay đổi của lỗi. Nó giúp giảm thiểu sự vọt lố và làm cho hệ thống ổn định hơn.}}\n\n((tip:Việc 'tinh chỉnh' các hằng số P, I và D là một quá trình thử và sai. Bắt đầu với P, sau đó thêm D để giảm dao động, và cuối cùng thêm một lượng nhỏ I để loại bỏ sai số còn lại.))\n\nHiểu về PID là một bước tiến lớn giúp bạn xây dựng các robot tự hành hiệu suất cao.`,
    references: [{ title: 'Giải thích về điều khiển PID - DFRobot', url: 'https://www.dfrobot.com/blog-976.html' }]
  },
  {
    id: 'robotics-9',
    title: 'Bộ não của Robot: Vi điều khiển',
    category: 'robotics',
    difficulty: 'Trung cấp',
    xpValue: 25,
    content: `Chúng ta đã biết robot có bộ xử lý, nhưng nó thực sự là gì? Đó chính là vi điều khiển (Microcontroller - MCU), một máy tính nhỏ gọn trên một con chip duy nhất.\n\n{{concept:Vi điều khiển (MCU):Một mạch tích hợp chứa bộ xử lý, bộ nhớ (RAM và Flash), và các chân đầu vào/ra (I/O pins). Các MCU phổ biến cho người mới bắt đầu là Arduino và Micro:bit.}}\n\nCác thành phần chính:\n- **Chân I/O (Input/Output):** Cho phép MCU giao tiếp với thế giới bên ngoài. Bạn kết nối cảm biến vào các chân đầu vào (input) và cơ cấu chấp hành (động cơ, đèn LED) vào các chân đầu ra (output).\n- **Bộ nhớ Flash:** Nơi lưu trữ chương trình của bạn. Dữ liệu vẫn còn ngay cả khi bạn tắt nguồn.\n- **RAM:** Bộ nhớ tạm thời để lưu trữ các biến khi chương trình đang chạy.\n\n((tip:Khi bạn viết mã trong Arduino IDE và nhấn nút 'Upload', mã của bạn sẽ được biên dịch thành ngôn ngữ máy và tải vào bộ nhớ Flash của vi điều khiển thông qua cáp USB.))\n\nHiểu về vi điều khiển giúp bạn biết cách kết nối các linh kiện và thiết kế các robot phức tạp hơn.`
  },
  {
    id: 'robotics-10',
    title: 'Giữ thăng bằng với Cảm biến Gyro',
    category: 'robotics',
    difficulty: 'Nâng cao',
    xpValue: 35,
    relatedProjects: ['proj-12'],
    content: `Làm thế nào một robot hai bánh có thể tự đứng vững? Bí mật nằm ở Cảm biến Đo lường Quán tính (Inertial Measurement Unit - IMU).\n\n{{video:fQ3IY_L-4vA}}\n\nIMU thường kết hợp hai loại cảm biến:\n- {{concept:Gia tốc kế (Accelerometer):Đo gia tốc tuyến tính, bao gồm cả gia tốc trọng trường. Nó có thể cho biết robot đang nghiêng về hướng nào so với mặt đất.}}\n- {{concept:Con quay hồi chuyển (Gyroscope):Đo vận tốc góc, tức là robot đang xoay nhanh như thế nào.}}\n\n((tip:Gia tốc kế bị nhiễu bởi các rung động, trong khi Gyroscope có xu hướng 'trôi' (drift) theo thời gian. Các thuật toán phức tạp như Bộ lọc Kalman (Kalman Filter) thường được sử dụng để kết hợp dữ liệu từ cả hai cảm biến để có được một phép đo góc nghiêng chính xác và ổn định.))\n\nKhi robot phát hiện nó đang nghiêng về phía trước, nó sẽ [[motor_run_forward]] để 'đuổi theo' điểm cân bằng. Tương tự, nếu nó nghiêng về phía sau, nó sẽ lùi lại. Bằng cách thực hiện các điều chỉnh này hàng trăm lần mỗi giây, robot có thể giữ thăng bằng một cách kỳ diệu!`
  },
  {
    id: 'robotics-11',
    title: 'Robot kết nối Internet (IoT)',
    category: 'robotics',
    difficulty: 'Nâng cao',
    xpValue: 40,
    content: `Internet vạn vật (Internet of Things - IoT) là một mạng lưới các thiết bị vật lý được kết nối với internet, cho phép chúng thu thập và chia sẻ dữ liệu. Bạn có thể biến robot của mình thành một thiết bị IoT!\n\nĐể làm được điều này, bạn cần một vi điều khiển có khả năng kết nối Wi-Fi, ví dụ như ESP32 hoặc ESP8266. Đây là những bộ não robot rất mạnh mẽ và giá cả phải chăng.\n\n{{concept:MQTT:Một giao thức nhắn tin gọn nhẹ, rất phổ biến trong IoT. Robot của bạn có thể 'đăng ký' (subscribe) vào một chủ đề (topic) để nhận lệnh, và 'xuất bản' (publish) dữ liệu cảm biến lên một chủ đề khác.}}\n\nCác ứng dụng có thể:\n- **Trạm thời tiết tại nhà:** Robot đọc nhiệt độ và độ ẩm, sau đó gửi dữ liệu lên một dịch vụ như ThingSpeak để bạn có thể xem biểu đồ trên điện thoại.\n- **Điều khiển từ xa toàn cầu:** Gửi lệnh cho robot của bạn từ bất kỳ đâu trên thế giới thông qua một trang web hoặc ứng dụng di động.\n- **Hệ thống cảnh báo:** Khi robot phát hiện chuyển động, nó có thể gửi thông báo đẩy (push notification) đến điện thoại của bạn.\n\n((tip:Bảo mật là một vấn đề lớn trong IoT. Hãy luôn đảm bảo bạn sử dụng mật khẩu mạnh cho mạng Wi-Fi và các dịch vụ trực tuyến của mình!))`
  },
  {
    id: 'scratch-14',
    title: 'Scrolling Nền (Parallax)',
    category: 'scratch',
    difficulty: 'Nâng cao',
    xpValue: 35,
    relatedProjects: ['proj-13'],
    content: `Hiệu ứng Parallax scrolling tạo ra ảo giác về chiều sâu trong game 2D bằng cách di chuyển các lớp nền với tốc độ khác nhau. Lớp nền ở xa di chuyển chậm hơn lớp nền ở gần.\n\nCách thực hiện:\n1. Tạo nhiều nhân vật làm lớp nền (background layers).\n2. Sử dụng một biến toàn cục, ví dụ: 'scrollX', để theo dõi vị trí cuộn của camera.\n3. Trong vòng lặp 'liên tục', đặt vị trí x của mỗi lớp nền thành 'scrollX' nhân với một hệ số. Ví dụ:\n   - Lớp nền gần nhất: \`set x to (scrollX * 0.8)\`\n   - Lớp nền xa nhất: \`set x to (scrollX * 0.2)\`\n4. Khi nhân vật chính di chuyển, thay đổi biến 'scrollX' thay vì thay đổi trực tiếp vị trí x của nhân vật.\n\n<<quiz:Để tạo hiệu ứng chiều sâu, lớp nền ở xa nhất nên di chuyển...|Nhanh nhất;Chậm nhất;Cùng tốc độ với nhân vật|1>>\n\n((tip:Bạn có thể cần các bản sao của mỗi lớp nền đặt cạnh nhau để tạo ra một thế giới liền mạch khi cuộn.))`
  },
  {
    id: 'scratch-15',
    title: 'Tương tác với Micro:bit',
    category: 'scratch',
    difficulty: 'Nâng cao',
    xpValue: 40,
    content: `Kết hợp thế giới ảo của Scratch với thế giới vật lý bằng cách sử dụng Micro:bit! Micro:bit là một máy tính nhỏ có thể lập trình được với đèn LED, nút bấm và cảm biến.\n\nĐể bắt đầu, bạn cần cài đặt Scratch Link và thêm tiện ích Micro:bit vào Scratch.\n\nSau khi kết nối, bạn sẽ có các khối lệnh mới:\n- [[when button [A] pressed]]: Chạy một kịch bản khi nút A trên Micro:bit được nhấn.\n- [[display [heart]]]]: Hiển thị một hình ảnh trên màn hình LED của Micro:bit.\n- [[when [tilted left]]]]: Kích hoạt sự kiện khi bạn nghiêng Micro:bit.\n\n{{concept:Bộ điều khiển tùy chỉnh:Bạn có thể biến Micro:bit thành một bộ điều khiển game không dây cho các dự án Scratch của mình. Sử dụng cảm biến gia tốc để điều khiển chuyển động và các nút bấm cho hành động.}}\n\nĐây là một cách tuyệt vời để làm cho các dự án của bạn trở nên tương tác và hữu hình hơn.`,
    references: [{ title: 'Scratch và Micro:bit', url: 'https://scratch.mit.edu/microbit' }]
  },
  {
    id: 'robotics-12',
    title: 'Thuật toán Bám tường',
    category: 'robotics',
    difficulty: 'Nâng cao',
    xpValue: 35,
    relatedProjects: ['proj-10', 'proj-14'],
    content: `Ngoài việc giải mê cung bằng cách luôn rẽ phải (thuật toán bám tường phải), có những thuật toán phức tạp hơn. Thuật toán Pledge là một ví dụ, nó giúp robot thoát khỏi các vòng lặp và các bẫy phức tạp trong mê cung.\n\nÝ tưởng cơ bản của thuật toán Bám tường (Wall Follower) là giữ cho một bên của robot (trái hoặc phải) luôn tiếp xúc với tường.\n\nLogic đơn giản (bám tường phải):\n1. Luôn cố gắng rẽ phải.\n2. Nếu có thể rẽ phải, hãy rẽ và đi một bước.\n3. Nếu không, hãy đi thẳng nếu có thể.\n4. Nếu không thể đi thẳng, rẽ trái.\n5. Nếu không thể rẽ trái, quay lại.\n\n{{concept:Cảm biến khoảng cách:Để thực hiện thuật toán này, robot cần ít nhất ba cảm biến khoảng cách: một ở phía trước, một ở bên phải và một ở bên trái để phát hiện các bức tường.}}\n\n((tip:Thuật toán này đảm bảo sẽ giải được mọi mê cung 'đơn giản' (simply connected), tức là mọi bức tường đều nối với nhau hoặc nối với biên của mê cung.))`
  },
  {
    id: 'robotics-13',
    title: 'Giao tiếp I2C',
    category: 'robotics',
    difficulty: 'Nâng cao',
    xpValue: 30,
    content: `I2C (Inter-Integrated Circuit) là một giao thức giao tiếp nối tiếp cho phép nhiều thiết bị "phụ" (slave) giao tiếp với một hoặc nhiều thiết bị "chủ" (master). Nó rất hữu ích trong robotics vì chỉ cần hai dây để kết nối nhiều cảm biến và cơ cấu chấp hành!\n\nHai dây đó là:\n- **SDA (Serial Data):** Dây để truyền dữ liệu.\n- **SCL (Serial Clock):** Dây để đồng bộ hóa việc truyền dữ liệu.\n\n{{concept:Địa chỉ I2C:Mỗi thiết bị phụ trên bus I2C có một địa chỉ 7-bit duy nhất. Thiết bị chủ sử dụng địa chỉ này để giao tiếp với một thiết bị cụ thể.}}\n\nNhiều cảm biến phức tạp như IMU, màn hình OLED, và cảm biến môi trường đều sử dụng I2C. Việc sử dụng giao thức này giúp tiết kiệm các chân I/O trên vi điều khiển của bạn và làm cho hệ thống dây điện gọn gàng hơn rất nhiều.\n\n((tip:Hãy chắc chắn rằng tất cả các thiết bị trên cùng một bus I2C phải có địa chỉ khác nhau, nếu không sẽ xảy ra xung đột địa chỉ!))`
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Game Mèo Đuổi Chuột',
    description: 'Một trò chơi đơn giản trong Scratch nơi bạn điều khiển chuột để tránh mèo.',
    imageUrl: 'https://picsum.photos/seed/project1/400/300',
    codeBlocks: [
      'khi bấm vào lá cờ xanh',
      'liên tục',
      'nếu <phím [mũi tên phải] được bấm?> thì',
      'hướng về phía (90) và di chuyển (10) bước',
      'nếu <đang chạm [Mèo]?> thì',
      'dừng lại [tất cả]'
    ]
  },
  {
    id: 'proj-2',
    title: 'Robot tránh vật cản',
    description: 'Xây dựng một robot đơn giản sử dụng cảm biến siêu âm để tự động di chuyển và tránh các chướng ngại vật.',
    imageUrl: 'https://picsum.photos/seed/project2/400/300',
    codeBlocks: [
      'liên tục',
      'nếu <khoảng cách < 15> thì',
      'dừng động cơ',
      'chạy động cơ trái (-50), phải (50) trong (1) giây',
      'ngược lại',
      'chạy động cơ thẳng với tốc độ (70)',
    ]
  },
  {
    id: 'proj-3',
    title: 'Câu chuyện tương tác',
    description: 'Tạo một câu chuyện phiêu lưu trong Scratch nơi người dùng có thể đưa ra lựa chọn để ảnh hưởng đến cốt truyện.',
    imageUrl: 'https://picsum.photos/seed/project3/400/300',
    codeBlocks: [
      'nói "Bạn thấy một ngã ba. Bạn đi trái hay phải?" trong (4) giây',
      'hỏi "Nhập \'trái\' hoặc \'phải\'" và đợi',
      'nếu <trả lời = "trái"> thì',
      'phát tin [Đi con đường bên trái]',
      'ngược lại',
      'phát tin [Đi con đường bên phải]',
    ]
  },
  {
    id: 'proj-4',
    title: 'Robot dò đường',
    description: 'Lắp ráp và lập trình một robot có thể tự động đi theo một vạch đen trên sàn.',
    imageUrl: 'https://picsum.photos/seed/project4/400/300',
    codeBlocks: [
      'liên tục',
      'nếu <cảm biến trái thấy đen> thì',
      'rẽ trái (tốc độ 30)',
      'nếu <cảm biến phải thấy đen> thì',
      'rẽ phải (tốc độ 30)',
      'ngược lại',
      'đi thẳng (tốc độ 50)',
    ]
  },
  {
    id: 'proj-5',
    title: 'Máy tính đơn giản',
    description: 'Tạo một máy tính trong Scratch có thể thực hiện các phép tính cộng, trừ, nhân, chia cơ bản.',
    imageUrl: 'https://picsum.photos/seed/project5/400/300',
    codeBlocks: [
      'hỏi "Nhập số thứ nhất:" và đợi',
      'đặt [số 1] thành (trả lời)',
      'hỏi "Nhập số thứ hai:" và đợi',
      'đặt [số 2] thành (trả lời)',
      'nói ( [số 1] + [số 2] )',
    ]
  },
  {
    id: 'proj-6',
    title: 'Cánh tay Robot',
    description: 'Lắp ráp một cánh tay robot đơn giản sử dụng động cơ servo để gắp và di chuyển các vật thể nhỏ.',
    imageUrl: 'https://picsum.photos/seed/project6/400/300',
    codeBlocks: [
      'xoay servo [đế] đến góc (90)',
      'đợi (1) giây',
      'xoay servo [khuỷu tay] đến góc (45)',
      'xoay servo [bàn kẹp] đến góc (0) -- để mở',
      'đợi (1) giây',
      'xoay servo [bàn kẹp] đến góc (90) -- để đóng',
    ]
  },
  {
    id: 'proj-7',
    title: 'Game đi cảnh (Platformer)',
    description: 'Xây dựng một game platformer cổ điển, nơi nhân vật của bạn có thể chạy và nhảy trên các nền tảng để đến đích.',
    imageUrl: 'https://picsum.photos/seed/project7/400/300',
    codeBlocks: [
      'đặt [trọng lực] thành (-1)',
      'liên tục',
      'thay đổi y một lượng (trọng lực)',
      'nếu <đang chạm [nền tảng]?> thì',
      'đặt [trọng lực] thành 0',
      'nếu <phím [mũi tên lên] được bấm?> thì',
      'thay đổi y một lượng (15)'
    ]
  },
  {
    id: 'proj-8',
    title: 'Robot điều khiển qua Bluetooth',
    description: 'Lập trình một robot có thể được điều khiển từ xa bằng ứng dụng điện thoại thông minh qua kết nối Bluetooth.',
    imageUrl: 'https://picsum.photos/seed/project8/400/300',
    codeBlocks: [
      'liên tục',
      'nếu <dữ liệu Bluetooth nhận được = "F"> thì',
      'đi thẳng',
      'nếu <dữ liệu Bluetooth nhận được = "L"> thì',
      'rẽ trái',
      'nếu <dữ liệu Bluetooth nhận được = "S"> thì',
      'dừng lại'
    ]
  },
  {
    id: 'proj-9',
    title: 'Game đố vui kiến thức',
    description: 'Tạo một trò chơi đố vui tương tác sử dụng danh sách để lưu trữ câu hỏi và câu trả lời, và các biến để theo dõi điểm số.',
    imageUrl: 'https://picsum.photos/seed/project9/400/300',
    codeBlocks: [
      'đặt [chỉ số câu hỏi] thành 1',
      'hỏi (mục (chỉ số câu hỏi) của [danh sách câu hỏi]) và đợi',
      'nếu <trả lời = mục (chỉ số câu hỏi) của [danh sách câu trả lời]> thì',
      'thay đổi [điểm] một lượng 1',
      'nói "Đúng rồi!" trong 1 giây',
      'ngược lại',
      'nói "Sai rồi!" trong 1 giây'
    ]
  },
  {
    id: 'proj-10',
    title: 'Robot giải mê cung',
    description: 'Một dự án đầy thử thách để chế tạo một robot có thể tự động điều hướng và tìm đường ra khỏi một mê cung đơn giản.',
    imageUrl: 'https://picsum.photos/seed/project10/400/300',
    codeBlocks: [
      '// Thuật toán bám tường phải',
      'liên tục',
      'nếu <không có tường bên phải> thì',
      'rẽ phải',
      'di chuyển về phía trước',
      'ngược lại nếu <có tường phía trước> thì',
      'rẽ trái',
      'ngược lại',
      'di chuyển về phía trước'
    ]
  },
  {
    id: 'proj-11',
    title: 'Vẽ Vườn hoa Tự động',
    description: 'Sử dụng khối lệnh Bút vẽ và các vòng lặp lồng nhau để tạo ra một chương trình tự động vẽ một vườn hoa với nhiều bông hoa đầy màu sắc.',
    imageUrl: 'https://picsum.photos/seed/project11/400/300',
    codeBlocks: [
      'xóa tất cả',
      'tạo khối [vẽ cánh hoa]',
      'định nghĩa [vẽ cánh hoa]',
      'lặp lại (6)',
      'di chuyển (50) bước',
      'xoay phải (60) độ',
      'lặp lại (20)',
      'thay đổi màu bút một lượng (10)',
    ]
  },
  {
    id: 'proj-12',
    title: 'Robot Tự Cân bằng',
    description: 'Một dự án nâng cao sử dụng cảm biến IMU (Gyro + Gia tốc kế) và thuật toán PID để giữ cho một robot 2 bánh đứng thẳng.',
    imageUrl: 'https://picsum.photos/seed/project12/400/300',
    codeBlocks: [
      'liên tục',
      'đọc góc nghiêng từ cảm biến IMU',
      'tính toán lỗi = góc nghiêng - điểm cân bằng',
      'tính toán điều khiển PID dựa trên lỗi',
      'điều khiển động cơ với tốc độ đã tính toán',
    ]
  },
  {
    id: 'proj-13',
    title: 'Game Cuộc đua Không gian',
    description: 'Một game bắn súng cuộn dọc với hiệu ứng parallax scrolling cho các ngôi sao và hành tinh ở nền.',
    imageUrl: 'https://picsum.photos/seed/project13/400/300',
    codeBlocks: [
      'liên tục',
      'đặt x của [Sao_lớp_1] thành (scrollX * 0.5)',
      'đặt x của [Sao_lớp_2] thành (scrollX * 0.2)',
      'nếu <phím [phải] được bấm?> thì',
      'thay đổi [scrollX] một lượng (-5)',
    ]
  },
  {
    id: 'proj-14',
    title: 'Robot Lái xe Thông minh',
    description: 'Sử dụng thuật toán bám tường để robot có thể tự động đi dọc theo một bức tường mà không va chạm.',
    imageUrl: 'https://picsum.photos/seed/project14/400/300',
    codeBlocks: [
      'liên tục',
      'đọc khoảng cách bên phải',
      'lỗi = khoảng cách mục tiêu - khoảng cách hiện tại',
      'điều chỉnh = lỗi * hằng số P',
      'tốc độ bánh trái = tốc độ cơ bản + điều chỉnh',
      'tốc độ bánh phải = tốc độ cơ bản - điều chỉnh',
    ]
  }
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
    {
      id: 'showcase-1',
      title: 'Cuộc phiêu lưu của Mèo Bay',
      description: 'Một game platformer đơn giản tôi làm sau khi học về biến và trọng lực. Hãy thử xem bạn có thể đi được bao xa!',
      imageUrl: 'https://picsum.photos/seed/showcase1/400/300',
      authorName: 'Học viên Cấp 5',
      authorLevel: 5,
      likes: 12,
    },
    {
      id: 'showcase-2',
      title: 'Robot Họa sĩ của tôi',
      description: 'Tôi đã lập trình cánh tay robot để vẽ ra những hình thù đơn giản. Đây là thành quả đầu tiên của tôi!',
      imageUrl: 'https://picsum.photos/seed/showcase2/400/300',
      authorName: 'Học viên Cấp 8',
      authorLevel: 8,
      likes: 25,
    },
    {
      id: 'showcase-3',
      title: 'Bản nhạc Scratch',
      description: 'Sử dụng các khối âm thanh và vòng lặp để tạo ra một bản nhạc ngắn. Mỗi nhân vật là một nhạc cụ khác nhau.',
      imageUrl: 'https://picsum.photos/seed/showcase3/400/300',
      authorName: 'Học viên Cấp 3',
      authorLevel: 3,
      likes: 8,
    },
    {
      id: 'showcase-4',
      title: 'Robot tự hành phiên bản đầu tiên',
      description: 'Kết hợp cảm biến siêu âm và cảm biến dò đường để nó không chỉ đi theo vạch mà còn dừng lại khi có vật cản.',
      imageUrl: 'https://picsum.photos/seed/showcase4/400/300',
      authorName: 'Học viên Cấp 10',
      authorLevel: 10,
      likes: 31,
    }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: 'Bước Chân Đầu Tiên',
    description: 'Hoàn thành bài học đầu tiên của bạn.',
    icon: TrophyIcon,
  },
  {
    id: 'badge-2',
    name: 'Nhà Thám Hiểm Tò Mò',
    description: 'Hoàn thành 5 bài học.',
    icon: TrophyIcon,
  },
  {
    id: 'badge-3',
    name: 'Người học việc Scratch',
    description: 'Hoàn thành tất cả các bài học Scratch cơ bản.',
    icon: TrophyIcon,
  },
  {
    id: 'badge-4',
    name: 'Nhà Chế Tạo Robot',
    description: 'Hoàn thành tất cả các bài học Robotics cơ bản.',
    icon: TrophyIcon,
  },
  {
    id: 'badge-5',
    name: 'Chuyên gia Scratch',
    description: 'Hoàn thành tất cả các bài học Scratch.',
    icon: TrophyIcon,
  },
  {
    id: 'badge-6',
    name: 'Bậc Thầy Robotics',
    description: 'Hoàn thành tất cả các bài học Robotics.',
    icon: TrophyIcon,
  },
  {
    id: 'badge-7',
    name: 'Nhà phát triển Game',
    description: 'Chinh phục Lộ trình Nhà phát triển Game Scratch.',
    icon: GameControllerIcon,
  },
  {
    id: 'badge-8',
    name: 'Kỹ sư Robotics',
    description: 'Chinh phục Lộ trình Kỹ sư Robotics.',
    icon: CogIcon,
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-scratch-dev',
    title: 'Con đường Nhà phát triển Game Scratch',
    description: 'Học các kỹ năng cốt lõi để xây dựng các trò chơi tương tác của riêng bạn, từ nhân vật di chuyển đến quản lý điểm số.',
    icon: GameControllerIcon,
    completionBadgeId: 'badge-7',
    steps: [
      { type: 'lesson', id: 'scratch-1' },
      { type: 'lesson', id: 'scratch-2' },
      { type: 'lesson', id: 'scratch-10' },
      { type: 'lesson', id: 'scratch-4' },
      { type: 'lesson', id: 'scratch-8' },
      { type: 'lesson', id: 'scratch-3' },
      { type: 'lesson', id: 'scratch-5' },
      { type: 'lesson', id: 'scratch-9' },
      { type: 'lesson', id: 'scratch-13' },
      { type: 'lesson', id: 'scratch-7' },
      { type: 'lesson', id: 'scratch-12' },
    ]
  },
  {
    id: 'path-robotics-eng',
    title: 'Hành trình Kỹ sư Robotics',
    description: 'Khám phá thế giới chế tạo robot, từ việc làm cho robot di chuyển đến việc sử dụng các cảm biến để tương tác với môi trường.',
    icon: CogIcon,
    completionBadgeId: 'badge-8',
    steps: [
      { type: 'lesson', id: 'robotics-1' },
      { type: 'lesson', id: 'robotics-2' },
      { type: 'lesson', id: 'robotics-9' },
      { type: 'lesson', id: 'robotics-3' },
      { type: 'lesson', id: 'robotics-4' },
      { type: 'lesson', id: 'robotics-6' },
      { type: 'lesson', id: 'robotics-7' },
      { type: 'lesson', id: 'robotics-10' },
      { type: 'lesson', id: 'robotics-8' },
      { type: 'lesson', id: 'robotics-11' },
    ]
  }
];

export const SHOP_ITEMS: ShopItem[] = [
    { id: 'item-1', name: 'Mũ Chóng Chóng', price: 50, icon: () => <div className="text-2xl">🎩</div>, type: 'hat', value: 'propeller-hat'},
    { id: 'item-2', name: 'Kính Râm Cực Ngầu', price: 75, icon: () => <div className="text-2xl">🕶️</div>, type: 'accessory', value: 'sunglasses'},
    { id: 'item-3', name: 'Mũ Tiệc Tùng', price: 30, icon: () => <div className="text-2xl">🎉</div>, type: 'hat', value: 'party-hat' },
    { id: 'item-4', name: 'Màu Đỏ Rực Rỡ', price: 100, icon: () => <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white"></div>, type: 'color', value: '#ef4444' },
    { id: 'item-5', name: 'Màu Xanh Tươi Mát', price: 100, icon: () => <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>, type: 'color', value: '#22c55e' },
    { id: 'item-6', name: 'Màu Vàng Ánh Kim', price: 150, icon: () => <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-white"></div>, type: 'color', value: '#facc15' },
];

export const PRACTICE_EXERCISES: PracticeExercise[] = [
  {
    id: 'ex-scratch-1-1',
    lessonId: 'scratch-1',
    title: 'Kiến thức cơ bản',
    description: 'Điền vào chỗ trống để hoàn thành câu sau.',
    reward: 5,
    data: {
      type: 'fill_in_the_blank',
      question: 'Đối tượng hoặc nhân vật bạn có thể lập trình trong Scratch được gọi là _____.',
      correctAnswer: 'Sprite'
    }
  },
  {
    id: 'ex-scratch-2-1',
    lessonId: 'scratch-2',
    title: 'Vòng lặp Chuyển động',
    description: 'Sắp xếp các khối sau theo đúng thứ tự để làm cho nhân vật xoay tại chỗ liên tục.',
    reward: 10,
    data: {
      type: 'code_block_order',
      blocks: ['turn right (15) degrees', 'liên tục'],
      correctOrder: [1, 0] // index of blocks array
    }
  },
  {
    id: 'ex-robotics-1-1',
    lessonId: 'robotics-1',
    title: 'Các bộ phận của Robot',
    description: 'Bộ phận nào được coi là "bộ não" của robot?',
    reward: 5,
    data: {
      type: 'multiple_choice',
      question: 'Bộ phận nào được coi là "bộ não" của robot?',
      choices: ['Cảm biến (Sensor)', 'Cơ cấu chấp hành (Actuator)', 'Bộ xử lý (Processor)'],
      correctAnswerIndex: 2
    }
  },
  {
    id: 'ex-robotics-4-1',
    lessonId: 'robotics-4',
    title: 'Logic Dò đường',
    description: 'Nếu cảm biến bên trái của robot dò đường phát hiện vạch đen, robot nên làm gì?',
    reward: 10,
    data: {
      type: 'multiple_choice',
      question: 'Nếu cảm biến bên trái của robot dò đường phát hiện vạch đen, robot nên làm gì?',
      choices: ['Đi thẳng', 'Rẽ phải', 'Rẽ trái', 'Dừng lại'],
      correctAnswerIndex: 2
    }
  },
  {
    id: 'ex-scratch-3-1',
    lessonId: 'scratch-3',
    title: 'Toán tử so sánh',
    description: 'Khối nào sau đây được dùng để so sánh hai giá trị trong một điều kiện "nếu...thì"?',
    reward: 10,
    data: {
      type: 'multiple_choice',
      question: 'Khối nào sau đây được dùng để so sánh hai giá trị?',
      choices: ['Khối hình chữ nhật (lệnh)', 'Khối hình lục giác (điều kiện)', 'Khối hình tròn (giá trị)'],
      correctAnswerIndex: 1
    }
  },
  {
    id: 'ex-scratch-5-1',
    lessonId: 'scratch-5',
    title: 'Giao tiếp giữa các nhân vật',
    description: 'Điền vào chỗ trống để hoàn thành câu mô tả về giao tiếp trong Scratch.',
    reward: 10,
    data: {
      type: 'fill_in_the_blank',
      question: 'Để gửi tín hiệu cho các nhân vật khác, chúng ta sử dụng khối lệnh _____.',
      correctAnswer: 'phát tin'
    }
  },
  {
    id: 'ex-robotics-2-1',
    lessonId: 'robotics-2',
    title: 'Các loại động cơ',
    description: 'Loại động cơ nào cho phép điều khiển chính xác vị trí góc?',
    reward: 5,
    data: {
      type: 'multiple_choice',
      question: 'Loại động cơ nào cho phép điều khiển chính xác vị trí góc, ví dụ như làm một cánh tay robot?',
      choices: ['Động cơ DC (DC Motor)', 'Động cơ Servo (Servo Motor)', 'Động cơ bước (Stepper Motor)'],
      correctAnswerIndex: 1
    }
  },
  {
    id: 'ex-scratch-10-1',
    lessonId: 'scratch-10',
    title: 'Khối Sự kiện',
    description: 'Để chạy một kịch bản khi người dùng nhấn một phím, bạn nên bắt đầu kịch bản đó với khối nào?',
    reward: 5,
    data: {
        type: 'multiple_choice',
        question: 'Khối nào dùng để bắt đầu một kịch bản khi người dùng nhấn phím cách?',
        choices: ['khi bấm vào nhân vật này', 'khi bấm vào lá cờ xanh', 'khi phím [dấu cách] được bấm'],
        correctAnswerIndex: 2
    }
  },
  {
    id: 'ex-scratch-14-1',
    lessonId: 'scratch-14',
    title: 'Tốc độ Parallax',
    description: 'Trong hiệu ứng parallax, lớp nền nào nên được gán hệ số nhân nhỏ nhất (ví dụ: * 0.1) với biến cuộn?',
    reward: 10,
    data: {
      type: 'multiple_choice',
      question: 'Lớp nền nào di chuyển chậm nhất?',
      choices: ['Lớp nền ở gần nhất', 'Lớp nền ở xa nhất', 'Tất cả di chuyển như nhau'],
      correctAnswerIndex: 1
    }
  },
  {
    id: 'ex-scratch-15-1',
    lessonId: 'scratch-15',
    title: 'Kết nối thế giới thực',
    description: 'Điền vào chỗ trống: Để sử dụng Micro:bit với Scratch, bạn cần cài đặt _____.',
    reward: 10,
    data: {
      type: 'fill_in_the_blank',
      question: 'Để sử dụng Micro:bit với Scratch, bạn cần cài đặt _____.',
      correctAnswer: 'Scratch Link'
    }
  },
  {
    id: 'ex-robotics-12-1',
    lessonId: 'robotics-12',
    title: 'Logic Bám tường',
    description: 'Khi robot đang bám tường phải và phát hiện có không gian trống ở bên phải, nó nên làm gì đầu tiên?',
    reward: 10,
    data: {
      type: 'multiple_choice',
      question: 'Ưu tiên hàng đầu của robot bám tường phải là gì?',
      choices: ['Đi thẳng', 'Rẽ trái', 'Rẽ phải'],
      correctAnswerIndex: 2
    }
  },
  {
    id: 'ex-robotics-13-1',
    lessonId: 'robotics-13',
    title: 'Giao tiếp I2C',
    description: 'Giao thức I2C cần bao nhiêu dây để giao tiếp?',
    reward: 5,
    data: {
      type: 'multiple_choice',
      question: 'Giao thức I2C cần bao nhiêu dây tín hiệu chính?',
      choices: ['1', '2', '4', '8'],
      correctAnswerIndex: 1
    }
  }
];

export const SIMULATION_BLOCKS: SimulationBlock[] = [
    // Scratch
    { id: 's-evt-1', text: 'khi bấm vào lá cờ xanh', category: 'events', command: 'when_flag_clicked' },
    { id: 's-mot-1', text: 'di chuyển (10) bước', category: 'motion', command: 'move (10) steps' },
    { id: 's-mot-2', text: 'xoay phải (15) độ', category: 'motion', command: 'turn right (15) degrees' },
    { id: 's-mot-3', text: 'đi tới vị trí ngẫu nhiên', category: 'motion', command: 'go to random position' },
    { id: 's-lok-1', text: 'nói Hello! trong 2 giây', category: 'looks', command: 'say Hello! for (2) seconds' },
    { id: 's-lok-2', text: 'đổi hiệu ứng màu một lượng 25', category: 'looks', command: 'change color effect by (25)' },
    { id: 's-con-1', text: 'đợi (1) giây', category: 'control', command: 'wait (1) seconds' },
    { id: 's-con-2', text: 'lặp lại (10)', category: 'control', command: 'repeat (10)' }, // Note: loop logic is special
    // Robotics
    { id: 'r-mot-1', text: 'chạy động cơ thẳng (50)', category: 'motors', command: 'motor_run' },
    { id: 'r-mot-2', text: 'xoay servo [cánh tay] (90) độ', category: 'motors', command: 'servo_turn' },
    { id: 'r-mot-3', text: 'đóng/mở bàn kẹp', category: 'motors', command: 'gripper_action' },
    { id: 'r-sen-1', text: 'nếu khoảng cách < 20', category: 'sensors', command: 'detect_obstacle' },
    { id: 'r-sen-2', text: 'đọc cảm biến màu', category: 'sensors', command: 'detect_color' },
];

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
    {
        id: 'sim-sc-1',
        title: 'Vũ điệu Mèo con',
        category: 'scratch',
        description: 'Làm cho chú mèo Scratch di chuyển, đổi màu và nói "Yay!" để hoàn thành vũ điệu.',
        availableBlockIds: ['s-mot-1', 's-lok-2', 's-lok-1'],
        solution: ['s-mot-1', 's-lok-2', 's-lok-1'],
        reward: 20
    },
    {
        id: 'sim-rb-1',
        title: 'Robot tuần tra',
        category: 'robotics',
        description: 'Lập trình robot đi thẳng. Nếu gặp vật cản, nó sẽ dừng lại và vẫy tay chào.',
        availableBlockIds: ['r-mot-1', 'r-sen-1', 'r-mot-2'],
        solution: ['r-mot-1', 'r-sen-1', 'r-mot-2'],
        reward: 25
    },
    {
        id: 'sim-sc-2',
        title: 'Mèo Ảo Thuật',
        category: 'scratch',
        description: 'Làm cho chú mèo di chuyển đến một vị trí ngẫu nhiên, đợi một chút rồi thực hiện một màn biến đổi màu sắc kỳ diệu.',
        availableBlockIds: ['s-mot-3', 's-con-1', 's-lok-2'],
        solution: ['s-mot-3', 's-con-1', 's-lok-2'],
        reward: 20
    },
    {
        id: 'sim-sc-3',
        title: 'Vòng xoay Vui nhộn',
        category: 'scratch',
        description: 'Lập trình cho chú mèo xoay một vòng, tiến về phía trước, rồi lại xoay một vòng nữa.',
        availableBlockIds: ['s-mot-1', 's-mot-2'],
        solution: ['s-mot-2', 's-mot-1', 's-mot-2'],
        reward: 20
    },
    {
        id: 'sim-rb-2',
        title: 'Robot Công nhân',
        category: 'robotics',
        description: 'Điều khiển một cánh tay robot để vươn ra và sử dụng bàn kẹp để gắp một vật thể.',
        availableBlockIds: ['r-mot-2', 'r-mot-3'],
        solution: ['r-mot-2', 'r-mot-3'],
        reward: 25
    },
    {
        id: 'sim-rb-3',
        title: 'Robot An ninh',
        category: 'robotics',
        description: 'Lập trình robot quét tìm một màu sắc cụ thể, sau đó vẫy cánh tay để báo hiệu khi đã tìm thấy.',
        availableBlockIds: ['r-sen-2', 'r-mot-2'],
        solution: ['r-sen-2', 'r-mot-2'],
        reward: 30
    }
];

export const DAILY_QUESTS_POOL: DailyQuest[] = [
    { id: 'dq-1', type: 'complete_lessons', description: 'Hoàn thành 1 bài học bất kỳ', target: 1, reward: 15 },
    { id: 'dq-2', type: 'complete_lessons', description: 'Hoàn thành 2 bài học Scratch', target: 2, reward: 30 },
    { id: 'dq-3', type: 'complete_exercises', description: 'Hoàn thành 3 bài tập thực hành', target: 3, reward: 20 },
    { id: 'dq-4', type: 'run_simulations', description: 'Hoàn thành 1 nhiệm vụ trong Sân chơi', target: 1, reward: 25 },
    { id: 'dq-5', type: 'earn_coins', description: 'Kiếm được 50 Sao Vàng', target: 50, reward: 10 },
    { id: 'dq-6', type: 'complete_lessons', description: 'Hoàn thành 1 bài học Robotics nâng cao', target: 1, reward: 25 },
];