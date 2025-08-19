import { useEffect } from "react";

const {kakao} = window;

const Map = ({location}) => {

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(35.8717829, 128.6249786), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    }
    
    const map = new kakao.maps.Map(container, options)
    
    if(location.lat && location.lon){
      console.log(location);
      const markerPosition = new kakao.maps.LatLng(location.lat, location.lon);

      const marker = new kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(map);
    }

  },[location])

  return(
    <div className='m-auto rounded-[50px] overflow-hidden'>
      <div id="map" className='w-full h-[500px]'></div>
    </div>
  )
}

export default Map;