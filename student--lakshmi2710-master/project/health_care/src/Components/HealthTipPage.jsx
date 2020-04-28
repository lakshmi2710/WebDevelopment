import React from 'react';
import welcomeImg from '../img/img12.jpg'

const HealthTipPage = ({ tipsList, callBackFromTips }) => {

  const tips = Object.values(tipsList).map((tip) =>
    <div className="tip">{tip.doctorName} : {tip.healthTip}</div>)

  const callBack = () => {
    callBackFromTips();
  }

  return (
    <div className='bg'>
      <img src={welcomeImg} alt="bg" class="bg" />
      <button className="btn-main" type="button" onClick={callBack}>Main Page</button>
      <div className="title">
        Health Tips By Doctors
      </div>
        <div className="tip-list">
            {tips}
        </div>
    </div>
  );
};

export default HealthTipPage;