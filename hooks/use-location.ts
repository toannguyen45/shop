import { useState, useEffect, useCallback } from 'react';
import { LocationService, ApiProvince, ApiDistrict, ApiWard } from '@/lib/location-service';

export function useLocation() {
  const [provinces, setProvinces] = useState<ApiProvince[]>([]);
  const [districts, setDistricts] = useState<ApiDistrict[]>([]);
  const [wards, setWards] = useState<ApiWard[]>([]);
  const [loading, setLoading] = useState({
    provinces: false,
    districts: false,
    wards: false,
  });

  // Load provinces on mount
  useEffect(() => {
    const loadProvinces = async () => {
      setLoading(prev => ({ ...prev, provinces: true }));
      try {
        const data = await LocationService.getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('Failed to load provinces:', error);
      } finally {
        setLoading(prev => ({ ...prev, provinces: false }));
      }
    };

    loadProvinces();
  }, []);

  // Load districts when province changes
  const loadDistricts = useCallback(async (provinceId: string, query?: string) => {
    if (!provinceId) {
      setDistricts([]);
      return;
    }

    setLoading(prev => ({ ...prev, districts: true }));
    try {
      const data = await LocationService.getDistrictsByProvince(provinceId, query);
      setDistricts(data);
    } catch (error) {
      console.error('Failed to load districts:', error);
      setDistricts([]);
    } finally {
      setLoading(prev => ({ ...prev, districts: false }));
    }
  }, []);

  // Load wards when district changes
  const loadWards = useCallback(async (districtId: string, query?: string) => {
    if (!districtId) {
      setWards([]);
      return;
    }

    setLoading(prev => ({ ...prev, wards: true }));
    try {
      const data = await LocationService.getWardsByDistrict(districtId, query);
      setWards(data);
    } catch (error) {
      console.error('Failed to load wards:', error);
      setWards([]);
    } finally {
      setLoading(prev => ({ ...prev, wards: false }));
    }
  }, []);

  return {
    provinces,
    districts,
    wards,
    loading,
    loadDistricts,
    loadWards,
  };
} 