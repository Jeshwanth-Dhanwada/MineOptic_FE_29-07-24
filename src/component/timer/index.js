//react
import { useEffect } from 'react';
import useTimer from '../../hooks/useTimer';
import { getDateTimeViewFormat } from '../../commonFunctions/date';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import StopCircleSharpIcon from '@mui/icons-material/StopCircleSharp';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
//react dom

/******** custom hooks ********/

/******** components ********/
//conditional wrapper component
const ConditionalWrapper = ({ initialWrapper, condition, wrapper, children }) =>
  condition ? wrapper(children) : initialWrapper(children);

const GradientTextColor = ({ children, unset = false, className = '' }) => (
  <span className={`${unset ? '' : 'gradient-text-color'} ${className}`}>{children}</span>
);

//button component
const Button = ({
  label,
  icon,
  iconPosition = 'left',
  className,
  variant = 'primary',
  size = 'default',
  round,
  fluid,
  isGradient = false,
  type = 'button',
  ...rest
}) => (
  <button
    className={`button ${round ? 'round' : ''} ${fluid ? 'fluid' : ''} ${!label ? 'centered' : ''
      } ${variant} ${size} ${className ?? ''}`}
    type={type}
    {...rest}
  >
    <ConditionalWrapper
      initialWrapper={(children) => <>{children}</>}
      condition={!!icon}
      wrapper={(children) => (
        <span
          className="button-content"
          style={{
            flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
            gap: !label ? 0 : 5,
          }}
        >
          {children}
        </span>
      )}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <ConditionalWrapper
        initialWrapper={(children) => <span className="button-label">{children}</span>}
        condition={isGradient}
        wrapper={(children) => (
          <GradientTextColor unset={variant === 'primary'}>{children}</GradientTextColor>
        )}
      >
        {label}
      </ConditionalWrapper>
    </ConditionalWrapper>
  </button>
);

/******** demo ********/

const Timer = ({
  renderedStreamDuration,
  isControlDisable,
  setisControlDisable,
  startHandler,
  stopHandler,
  setIsStopTimer,
  pauseHandler,
  resumeHandler,
  setTimer,
  initialDate,
  isPlaying,
  prevHandler,
  ForwardHandler,
  timerShow,
  setTruckCoordinates,
  truckCoordinates
}) => {


  useEffect(() => {
    setTimer(initialDate);
  }, [initialDate])

  return (
    // <div className="container-fluid">
      <div className="mt-1">
          <Tooltip title="Previous">
            <IconButton disabled={!(!isControlDisable && !isPlaying)}>
              <SkipPreviousIcon onClick={prevHandler} style={{ fontSize: 28 }} />
            </IconButton>
          </Tooltip>

          {isPlaying ? (
            <Tooltip title="Pause">
              <IconButton disabled={isControlDisable}>
                <PauseIcon
                  onClick={pauseHandler}
                  style={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Play">
              <IconButton disabled={isControlDisable}>
                <PlayArrowIcon style={{ fontSize: 28 }} onClick={startHandler} variant="white" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Forward">
            <IconButton disabled={!(!isControlDisable && !isPlaying)}>
              <SkipNextIcon onClick={ForwardHandler}  style={{ fontSize: 28 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <IconButton disabled={isControlDisable}>
              <StopCircleSharpIcon
                style={{ fontSize: 28 }}
                onClick={stopHandler}
                
              />
            </IconButton>
          </Tooltip>
        {/* <div className="timer-display "><b>{timerShow && getDateTimeViewFormat(renderedStreamDuration)}</b></div> */}

      </div>
    // </div>
  );
};

export default Timer;
