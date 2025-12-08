// File chứa dữ liệu các di tích
// Bạn có thể thêm/sửa/xóa di tích ở đây

export const monuments = [
  {
    id: 1,
    name: 'Tháp Rùa',
    description: 'Tháp Rùa là một ngôi tháp nhỏ nằm ở trung tâm Hồ Gươm, quận Hoàn Kiếm, thành phố Hà Nội. Đây là một trong những biểu tượng văn hóa nổi tiếng của thủ đô.',
    coordinates: '21°01′40″N 105°51′08″E',
    position: [105.85229, 21.02785], // [lng, lat]
    address: 'Hồ Hoàn Kiếm, quận Hoàn Kiếm, thành phố Hà Nội',
    yearBuilt: '1886',
    modelPath: '/House.glb',
    markerColor: '#ff6b6b' // Màu marker tùy chỉnh
  },
  
  // Ví dụ thêm di tích khác (bỏ comment để sử dụng)
  /*
  {
    id: 2,
    name: 'Văn Miếu - Quốc Tử Giám',
    description: 'Văn Miếu - Quốc Tử Giám là quần thể di tích lịch sử - văn hóa nằm ở phía Nam Thăng Long, Hà Nội.',
    coordinates: '21°01′42″N 105°50′09″E',
    position: [105.83583, 21.02833],
    address: '58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội',
    yearBuilt: '1070',
    modelPath: '/models/vanmieu.glb',
    markerColor: '#4ecdc4'
  },
  {
    id: 3,
    name: 'Hoàng Thành Thăng Long',
    description: 'Hoàng Thành Thăng Long là di sản văn hóa thế giới được UNESCO công nhận năm 2010.',
    coordinates: '21°01′50″N 105°50′28″E',
    position: [105.84111, 21.03056],
    address: 'Hoàng Diệu, Điện Bàn, Ba Đình, Hà Nội',
    yearBuilt: '1010',
    modelPath: '/models/hoangthanhthanglong.glb',
    markerColor: '#95e1d3'
  },
  */
];

// Hàm helper để tìm di tích theo ID
export const getMonumentById = (id) => {
  return monuments.find(monument => monument.id === id);
};

// Hàm helper để lấy tất cả tọa độ
export const getAllPositions = () => {
  return monuments.map(m => ({ id: m.id, position: m.position }));
};

