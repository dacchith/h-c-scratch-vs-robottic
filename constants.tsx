
import type { Lesson, Project } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'scratch-1',
    title: 'Giới thiệu về Scratch',
    category: 'scratch',
    content: `Scratch là một ngôn ngữ lập trình trực quan, dựa trên khối lệnh, được phát triển bởi MIT Media Lab. Nó được thiết kế để giúp trẻ em và người mới bắt đầu học các khái niệm lập trình một cách thú vị và dễ hiểu.\n\nVới Scratch, bạn có thể tạo ra các câu chuyện tương tác, trò chơi và hoạt ảnh của riêng mình. Thay vì gõ các dòng mã phức tạp, bạn chỉ cần kéo và thả các khối lệnh đầy màu sắc lại với nhau như trò chơi xếp hình.\n\nCác khái niệm cơ bản bạn sẽ học bao gồm:\n- **Nhân vật (Sprites):** Các đối tượng hoặc nhân vật bạn có thể lập trình.\n- **Sân khấu (Stage):** Nền của dự án của bạn.\n- **Khối lệnh (Blocks):** Các lệnh để điều khiển nhân vật và sân khấu.\n- **Kịch bản (Scripts):** Chuỗi các khối lệnh được kết nối với nhau để tạo ra một hành động.`
  },
  {
    id: 'scratch-2',
    title: 'Di chuyển và Vòng lặp',
    category: 'scratch',
    content: `Một trong những điều đầu tiên bạn sẽ làm trong Scratch là làm cho nhân vật của mình di chuyển. Khối "di chuyển (10) bước" là một khởi đầu tuyệt vời. \n\nĐể tạo ra các chuyển động phức tạp hơn hoặc lặp lại các hành động, chúng ta sử dụng vòng lặp. Khối "lặp lại (10)" cho phép bạn thực thi một nhóm các khối lệnh nhiều lần. Khối "liên tục" sẽ chạy các khối lệnh bên trong nó mãi mãi cho đến khi bạn dừng chương trình.\n\nVí dụ: để làm cho một nhân vật đi qua lại trên màn hình:\n1. Bắt đầu với khối "khi bấm vào lá cờ xanh".\n2. Đặt một khối "liên tục" bên dưới nó.\n3. Bên trong khối "liên tục", đặt một khối "di chuyển (10) bước".\n4. Thêm một khối "nếu ở biên, bật lại".\nBây giờ nhân vật của bạn sẽ di chuyển không ngừng!`
  },
   {
    id: 'scratch-3',
    title: 'Biến và Điều kiện',
    category: 'scratch',
    content: `**Biến (Variables)** giống như những chiếc hộp để lưu trữ thông tin. Bạn có thể lưu trữ điểm số, thời gian, hoặc tên người chơi. Bạn có thể tạo biến của riêng mình trong mục "Các biến số".\n\n**Điều kiện (Conditionals)** cho phép chương trình của bạn đưa ra quyết định. Khối "nếu...thì" là khối điều kiện phổ biến nhất. Nó kiểm tra xem một điều kiện có đúng hay không. Nếu đúng, nó sẽ chạy các khối lệnh bên trong.\n\nVí dụ về tính điểm trong trò chơi:\n1. Tạo một biến có tên là "điểm".\n2. Khi trò chơi bắt đầu, sử dụng khối "đặt [điểm] thành 0".\n3. Khi nhân vật chạm vào một đồng xu, sử dụng khối "nếu <đang chạm [đồng xu]?> thì".\n4. Bên trong khối "nếu", đặt khối "thay đổi [điểm] một lượng (1)".`
  },
  {
    id: 'robotics-1',
    title: 'Giới thiệu về Robotics',
    category: 'robotics',
    content: `Robotics là một lĩnh vực kỹ thuật và khoa học máy tính liên quan đến việc thiết kế, chế tạo, vận hành và sử dụng robot.\n\nMột robot thường bao gồm ba phần chính:\n- **Cảm biến (Sensors):** Giúp robot nhận biết về môi trường xung quanh (ví dụ: cảm biến khoảng cách, cảm biến ánh sáng, cảm biến va chạm).\n- **Bộ xử lý (Processor):** "Bộ não" của robot, thường là một vi điều khiển (như Arduino, Raspberry Pi) để xử lý thông tin từ cảm biến và đưa ra quyết định.\n- **Cơ cấu chấp hành (Actuators):** Các bộ phận giúp robot di chuyển hoặc tương tác với môi trường (ví dụ: động cơ, servo, đèn LED, loa).\n\nLập trình robot liên quan đến việc viết mã để đọc dữ liệu từ cảm biến và điều khiển các cơ cấu chấp hành dựa trên dữ liệu đó.`
  },
  {
    id: 'robotics-2',
    title: 'Động cơ và Cảm biến',
    category: 'robotics',
    content: `**Động cơ DC (DC Motors)** là loại động cơ phổ biến nhất để tạo ra chuyển động quay, chẳng hạn như làm quay bánh xe. Bạn có thể điều khiển tốc độ và hướng quay của chúng.\n\n**Động cơ Servo (Servo Motors)** cho phép điều khiển chính xác vị trí góc. Chúng rất hữu ích để tạo ra các chuyển động như cánh tay robot, tay lái hoặc cửa.\n\n**Cảm biến siêu âm (Ultrasonic Sensors)** đo khoảng cách bằng cách phát ra sóng âm và đo thời gian sóng âm phản xạ lại. Chúng rất tốt để giúp robot tránh chướng ngại vật.\n\n**Cảm biến dò đường (Line Follower Sensors)** sử dụng tia hồng ngoại để phát hiện các vạch tối trên bề mặt sáng (hoặc ngược lại). Đây là thành phần chính của robot dò đường.`
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Game Mèo Đuổi Chuột',
    description: 'Một trò chơi đơn giản trong Scratch nơi bạn điều khiển chuột để tránh mèo.',
    imageUrl: 'https://picsum.photos/seed/project1/400/300'
  },
  {
    id: 'proj-2',
    title: 'Robot tránh vật cản',
    description: 'Xây dựng một robot đơn giản sử dụng cảm biến siêu âm để tự động di chuyển và tránh các chướng ngại vật.',
    imageUrl: 'https://picsum.photos/seed/project2/400/300'
  },
  {
    id: 'proj-3',
    title: 'Câu chuyện tương tác',
    description: 'Tạo một câu chuyện phiêu lưu trong Scratch nơi người dùng có thể đưa ra lựa chọn để ảnh hưởng đến cốt truyện.',
    imageUrl: 'https://picsum.photos/seed/project3/400/300'
  },
  {
    id: 'proj-4',
    title: 'Robot dò đường',
    description: 'Lắp ráp và lập trình một robot có thể tự động đi theo một vạch đen trên sàn.',
    imageUrl: 'https://picsum.photos/seed/project4/400/300'
  },
];
