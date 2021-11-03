import styled from 'styled-components';

const MileageDisplayWrapper = styled.div`
  margin: 1% 6% 1% 6%;
  display: flex;
  flex-direction: column;
  > .mileage_title {
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 1.5em;
    padding: 0.5% 1% 0.5% 1%;
  }
  > .mileage_contents {
    display: flex;
    flex-direction: row;
    padding: 2em;
  }
`;

const MileageCategoryWrapper = styled.div`
  flex: 1 1 0;
  > .mileage_cat_name_1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 2em;
    font-weight: 500;
    text-align: right;
  }
  > .mileage_cat_name_2 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 1em;
    text-align: right;
  }
  > .mileage_cat_name_3 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 1em;
    text-align: right;
  }
`;

const MileageValueWrapper = styled.div`
  flex: 1 1 0;
  > .mileage_val_name_1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 2em;
    font-weight: 500;
    text-align: right;
  }
  > .mileage_val_name_2 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 1em;
    text-align: right;
  }
  > .mileage_val_name_3 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 1em;
    text-align: right;
  }
`;

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MileageDisplay = ({userInfo, totalPrice}) => {
  return (
    <MileageDisplayWrapper>
      <div className="mileage_title">내 마일리지</div>
      <div className="mileage_contents">
        <MileageCategoryWrapper>
          <div className="mileage_cat_name_1">사용가능한 마일리지</div>
          <div className="mileage_cat_name_2">장바구니 합계</div>
          <div className="mileage_cat_name_3">사용 후 마일리지</div>
        </MileageCategoryWrapper>
        <MileageValueWrapper>
          <p className="mileage_val_name_1">{numberWithCommas(userInfo.mileage)} M</p>
          <p className="mileage_val_name_2">− {numberWithCommas(totalPrice)} M</p>
          <p className="mileage_val_name_3">{numberWithCommas(userInfo.mileage - totalPrice)} M</p>
        </MileageValueWrapper>
      </div>
    </MileageDisplayWrapper>
  )
};

export default MileageDisplay;