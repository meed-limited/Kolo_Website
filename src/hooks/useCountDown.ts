import { useEffect, useState } from "react";

export const useCountdown = (expiryDate: string) => {
  const countDownDate = new Date(expiryDate).getTime();

  const [countDown, setCountDown] = useState<number>(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const hr = hours < 10 ? `0${hours}` : `${hours}`;

  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const min = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  const sec = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return [days, hr, min, sec];
};
