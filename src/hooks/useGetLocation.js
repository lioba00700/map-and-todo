// 2025.08.19 추가
//사용자의 현재 위치를 수집하는 커스텀 Hook

import { useEffect, useState } from "react"

const useGetLocation = () => {
  const [location, setLocation] = useState({
    lat: null, //위도
    lon: null //경도
  });

  //위지 수집에 성공했을 때 실행될 콜백 함수
  const handleSuccess = (position) => {
    const {latitude, longitude} = position.coords;
    setLocation({lat:latitude, lon:longitude});
  }

  //위치 수집에 실패했을 때 실행될 콜백 함수
  const handleError = (error) => {
    //대구스케일업허브 위치로 변경
    console.log('위치 수집 실패', error);
    setLocation({lat:35.87176120699, lon:35.87176120699});
  }

  useEffect(()=>{
    const {geolocation} = navigator;
    if(!geolocation){
      return;
    }
    geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [])
  
  return location;
}

export default useGetLocation;