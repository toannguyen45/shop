// Types for API response
export interface ApiProvince {
  id: string;
  name: string;
  type: number;
  typeText: string;
  slug: string;
}

export interface ApiDistrict {
  id: string;
  name: string;
  type: number;
  typeText: string;
  slug: string;
  provinceId: string;
}

export interface ApiWard {
  id: string;
  name: string;
  type: number;
  typeText: string;
  slug: string;
  districtId: string;
}

export interface ApiResponse<T> {
  total: number;
  data: T[];
  code: string;
  message: string | null;
}

// Location service class
export class LocationService {
  private static baseUrl = 'https://open.oapi.vn/location';

  // Get all provinces with pagination
  static async getProvinces(): Promise<ApiProvince[]> {
    try {
      // Lấy tất cả provinces bằng cách sử dụng size lớn
      const response = await fetch(`${this.baseUrl}/provinces?page=0&size=100`);
      const data: ApiResponse<ApiProvince> = await response.json();
      
      if (data.code === 'success') {
        console.log(`Loaded ${data.data.length} provinces out of ${data.total}`);
        return data.data;
      }
      throw new Error(data.message || 'Failed to fetch provinces');
    } catch (error) {
      console.error('Error fetching provinces:', error);
      return [];
    }
  }

  // Get districts by province ID with pagination
  static async getDistrictsByProvince(provinceId: string, query: string = ''): Promise<ApiDistrict[]> {
    try {
      // Lấy tất cả districts bằng cách sử dụng size lớn
      const url = `${this.baseUrl}/districts/${provinceId}?page=0&size=100${query ? `&query=${query}` : ''}`;
      const response = await fetch(url);
      const data: ApiResponse<ApiDistrict> = await response.json();
      
      if (data.code === 'success') {
        console.log(`Loaded ${data.data.length} districts for province ${provinceId}`);
        return data.data;
      }
      throw new Error(data.message || 'Failed to fetch districts');
    } catch (error) {
      console.error('Error fetching districts:', error);
      return [];
    }
  }

  // Get wards by district ID with pagination
  static async getWardsByDistrict(districtId: string, query: string = ''): Promise<ApiWard[]> {
    try {
      // Lấy tất cả wards bằng cách sử dụng size lớn
      const url = `${this.baseUrl}/wards/${districtId}?page=0&size=100${query ? `&query=${query}` : ''}`;
      const response = await fetch(url);
      const data: ApiResponse<ApiWard> = await response.json();
      
      if (data.code === 'success') {
        console.log(`Loaded ${data.data.length} wards for district ${districtId}`);
        return data.data;
      }
      throw new Error(data.message || 'Failed to fetch wards');
    } catch (error) {
      console.error('Error fetching wards:', error);
      return [];
    }
  }

  // Alternative method: Get all provinces without pagination
  static async getAllProvinces(): Promise<ApiProvince[]> {
    try {
      // Thử lấy tất cả provinces không có pagination
      const response = await fetch(`${this.baseUrl}/provinces`);
      const data: ApiResponse<ApiProvince> = await response.json();
      
      if (data.code === 'success') {
        console.log(`Loaded ${data.data.length} provinces out of ${data.total}`);
        
        // Nếu có pagination và chưa lấy hết, thử lấy thêm
        if (data.total > data.data.length) {
          console.log('Fetching additional provinces...');
          const additionalResponse = await fetch(`${this.baseUrl}/provinces?page=1&size=${data.total - data.data.length}`);
          const additionalData: ApiResponse<ApiProvince> = await additionalResponse.json();
          
          if (additionalData.code === 'success') {
            return [...data.data, ...additionalData.data];
          }
        }
        
        return data.data;
      }
      throw new Error(data.message || 'Failed to fetch provinces');
    } catch (error) {
      console.error('Error fetching provinces:', error);
      return [];
    }
  }
} 