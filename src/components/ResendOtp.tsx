import React, { useState, useEffect } from "react";

interface receiveData{
    initialSecond: number;
    onPress: ()=>void;
}

const ResendOtp: React.FC<receiveData> = ({initialSecond,onPress}) => {
  const [timeRemain, setTimeRemain] = useState<number>(initialSecond);

  useEffect(() => {
    if(timeRemain === 0)
      return;
    const countDown = setInterval(() => {
      setTimeRemain((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countDown);
  }, [timeRemain]);

  const formatTime = (remainSecond: number): string => {
    const minute: string = Math.floor(remainSecond / 60)
      .toString()
      .padStart(2, "0");
    const second: string = Math.floor(remainSecond % 60)
      .toString()
      .padStart(2, "0");
    return `${minute}:${second}`;
  };

  return (
    <div>
      {timeRemain === 0 ? (
        <div>
          <p onClick={() => {
            setTimeRemain(initialSecond);
            onPress();
          }}>Resend</p>
        </div>
      ) : (
        <div>
          <p>Resend otp in {formatTime(timeRemain)}</p>
        </div>
      )}
    </div>
  );
};

export default ResendOtp;
