import { useEffect, useState, useCallback, useRef } from 'react';
import { incrementDateTime } from '../commonFunctions/date';

const useTimer = (initialDate) => {
  const [renderedStreamDuration, setRenderedStreamDuration] = useState(new Date(initialDate));
  const [isPlaying, setIsPlaying] = useState(false);
  const [truckCoordinates, setTruckCoordinates] = useState([]);
  const [isStartTimer, setIsStartTimer] = useState(false),
    [timerSpeed, setTimerSpeed] = useState(1000),
    timerRef = useRef(0),
    [index, setIndex] = useState(0),
    prevTimeref = useRef(new Date(initialDate)),
    [isControlDisable, setisControlDisable] = useState(true),
    [isStopTimer, setIsStopTimer] = useState(true),
    [isPauseTimer, setIsPauseTimer] = useState(true),
    [isResumeTimer, setIsResumeTimer] = useState(true),
    isStartBtnDisabled = isPauseTimer || isResumeTimer || isStartTimer ,
    isStopBtnDisabled = !(isPauseTimer || isResumeTimer || isStartTimer),
    isPauseBtnDisabled = !(isStartTimer || (!isStartTimer && isResumeTimer)),
    isResumeBtnDisabled = !isPauseTimer;

  const updateTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => prev + 1)
    }, timerSpeed)
    return () => clearTimer();
  }, [isStartTimer]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIndex((prev) => prev + 1)
      }, timerSpeed)
    }
  }, [timerSpeed])


  const startTimer = useCallback(() => {
    updateTimer();
  }, [updateTimer]);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }

  useEffect(() => {
    if (isStartTimer && !isStopTimer) {
      startTimer();
    }
    if (isStopTimer && !isStartTimer) {
      setRenderedStreamDuration(new Date(initialDate));
      clearTimer()
    }
    return () => clearTimer();
  }, [isStartTimer, isStopTimer, startTimer]);

  const setTimer = (updateDate) => {
    setRenderedStreamDuration(new Date(updateDate));
  }
  
  const prevHandle = useCallback(() => {
    setIndex(index< 0 ? 0 : index - 1);
    console.log("prev index:", index);
  }, [index]);

  const forwardHandle = useCallback(() => {
    setIndex(index < 0 ? 0 : index + 1);
    console.log("forward index:", index);
  }, [index]);

  const prevHandler = () => {
    setIsStopTimer(true);
    setIsStartTimer(false);
    setIsPauseTimer(false);
    setIsResumeTimer(false);
    prevHandle();
  };

  const ForwardHandler = () => {
    setIsStopTimer(true);
    setIsStartTimer(false);
    setIsPauseTimer(false);
    setIsResumeTimer(false);
    setIsPlaying(false);
    forwardHandle();
  };
  const startHandler = () => {
    setIsStartTimer(true);
    setIsPlaying(true);
    setIsStopTimer(false);
  };

  const stopHandler = () => {
    setIsStopTimer(true);
    setIsStartTimer(false);
    setIsPauseTimer(false);
    setIsResumeTimer(false);
    setIsPlaying(false)
    setIndex(0)
    setTruckCoordinates([])

  };

  const pauseHandler = (isCompleted) => {
    setIsPauseTimer(isCompleted ? false : true);
    setIsStartTimer(false);
    setIsResumeTimer(false);
    setIsPlaying(false)
    clearTimer()
  };

  const resumeHandler = () => {
    setIsResumeTimer(true);
    setIsPauseTimer(false);
    setIsPlaying(false)
    // resetTimer()
  };

  return {
    renderedStreamDuration,
    initialDate,
    isControlDisable,
    setisControlDisable,
    startHandler,
    stopHandler,
    pauseHandler,
    resumeHandler,
    setTimer,
    prevTimeref,
    index,
    isPlaying,
    setTimerSpeed,
    prevHandler,
    ForwardHandler,
    setTruckCoordinates,
    truckCoordinates
  };
};

export default useTimer