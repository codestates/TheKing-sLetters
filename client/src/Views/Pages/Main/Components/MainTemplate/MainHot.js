import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainHotContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 2% 6%;
  box-sizing: border-box;
  background-color: #d4cdc1;
  .main__banner {
    width: 100%;
    .box {
      width: 100%;
      height: 400px;
      border: 1px solid black;
      box-sizing: border-box;
    }
    .box1 {
      background: skyblue;
    }
    .box2 {
      background: hotpink;
    }
    .box3 {
      background: crimson;
    }
    .box4 {
      background: springgreen;
    }
    .box5 {
      background: lavender;
    }
    .box6 {
      background: tan;
    }
  }
  .slick-dots {
  }
  .slick-prev {
    left: 0 !important;
    z-index: 100;
  }
  .slick-next {
    right: 0 !important;
    z-index: 100;
  }
`;
const settings = {
  //여기있는 settings값만 수정가능 'settings'자체를 수정할 순 없음
  dots: true, // 슬라이드 밑에 점 보이게
  infinite: true, // 무한으로 반복
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000, // 넘어가는 속도
  slidesToShow: 3, // 4장씩 보이게
  slidesToScroll: 1, // 1장씩 뒤로 넘어가게
  centerMode: true,
  centerPadding: '0px', // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
};

const MainHot = () => {
  return (
    <MainHotContainer>
      <div className="main__banner">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div className="box box1">
            <h3>1</h3>
          </div>
          <div className="box box2">
            <h3>2</h3>
          </div>
          <div className="box box3">
            <h3>3</h3>
          </div>
          <div className="box box4">
            <h3>4</h3>
          </div>
          <div className="box box5">
            <h3>5</h3>
          </div>
          <div className="box box6">
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </MainHotContainer>
  );
};

export default MainHot;
