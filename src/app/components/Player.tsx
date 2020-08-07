import React, { Component, ReactNode, CSSProperties } from 'react';
import PropTypes from 'prop-types';

interface ReactAudioPlayerProps {
  autoPlay?: boolean
  children?: ReactNode
  className?: string
  controls?: boolean
  controlsList?: string
  crossOrigin?: string
  id?: string
  listenInterval?: number
  loop?: boolean
  muted?: boolean
  onAbort?: (e: Event) => void 
  onCanPlay?: (e: Event) => void 
  onCanPlayThrough?: (e: Event) => void 
  onEnded?: (e: Event) => void 
  onError?: (e: Event) => void 
  onListen?: (time: number) => void 
  onLoadedMetadata?: (e: Event) => void 
  onPause?: (e: Event) => void 
  onPlay?: (e: Event) => void 
  onSeeked?: (e: Event) => void 
  onVolumeChanged?: (e: Event) => void 
  preload?: '' | 'none' | 'metadata' | 'auto'
  src?: string, // Not required b/c can use <source>
  style?: CSSProperties
  title?: string
  volume?: number
}

interface ConditionalProps {
  controlsList?: string
  [key: string]: any
}

class ReactAudioPlayer extends Component<ReactAudioPlayerProps, null> {
  static propTypes: Object

  static defaultProps: ReactAudioPlayerProps

  audioEl = React.createRef<HTMLAudioElement>();

  listenTracker?: number

  componentDidMount() {
    const audio = this.audioEl.current;

    this.updateVolume(this.props.volume);

    audio.addEventListener('error', (e) => {
      this.props.onError(e);
    });

    // When enough of the file has downloaded to start playing
    audio.addEventListener('canplay', (e) => {
      this.props.onCanPlay(e);
    });

    // When enough of the file has downloaded to play the entire file
    audio.addEventListener('canplaythrough', (e) => {
      this.props.onCanPlayThrough(e);
    });

    // When audio play starts
    audio.addEventListener('play', (e) => {
      this.setListenTrack();
      this.props.onPlay(e);
    });

    // When unloading the audio player (switching to another src)
    audio.addEventListener('abort', (e) => {
      this.clearListenTrack();
      this.props.onAbort(e);
    });

    // When the file has finished playing to the end
    audio.addEventListener('ended', (e) => {
      this.clearListenTrack();
      this.props.onEnded(e);
    });

    // When the user pauses playback
    audio.addEventListener('pause', (e) => {
      this.clearListenTrack();
      this.props.onPause(e);
    });

    // When the user drags the time indicator to a new time
    audio.addEventListener('seeked', (e) => {
      this.props.onSeeked(e);
    });

    audio.addEventListener('loadedmetadata', (e) => {
      this.props.onLoadedMetadata(e);
    });

    audio.addEventListener('volumechange', (e) => {
      this.props.onVolumeChanged(e);
    });
  }

  componentDidUpdate(prevProps: ReactAudioPlayerProps) {
    this.updateVolume(this.props.volume);
  }

  /**
   * Set an interval to call props.onListen every props.listenInterval time period
   */
  setListenTrack() {
    if (!this.listenTracker) {
      const listenInterval = this.props.listenInterval;
      this.listenTracker = window.setInterval(() => {
        this.props.onListen(this.audioEl.current.currentTime);
      }, listenInterval);
    }
  }

  /**
   * Set the volume on the audio element from props
   * @param {Number} volume
   */
  updateVolume(volume: number) {
    if (typeof volume === 'number' && volume !== this.audioEl.current.volume) {
      this.audioEl.current.volume = volume;
    }
  }

  /**
   * Clear the onListen interval
   */
  clearListenTrack() {
    if (this.listenTracker) {
      clearInterval(this.listenTracker);
      delete this.listenTracker;
    }
  }

  render() {
    const incompatibilityMessage = this.props.children || (
      <p>Your browser does not support the <code>audio</code> element.</p>
    );

    // Set controls to be true by default unless explicity stated otherwise
    const controls = !(this.props.controls === false);

    // Set lockscreen / process audio title on devices
    const title = this.props.title ? this.props.title : this.props.src;

    // Some props should only be added if specified
    const conditionalProps: ConditionalProps = {};
    if (this.props.controlsList) {
      conditionalProps.controlsList = this.props.controlsList;
    }

    return (
      <audio
        autoPlay={this.props.autoPlay}
        className={`react-audio-player ${this.props.className}`}
        controls={controls}
        crossOrigin={this.props.crossOrigin}
        id={this.props.id}
        loop={this.props.loop}
        muted={this.props.muted}
        preload={this.props.preload}
        ref={this.audioEl}
        src={this.props.src}
        style={this.props.style}
        title={title}
        {...conditionalProps}
      >
        {incompatibilityMessage}
      </audio>
    );
  }
}

ReactAudioPlayer.defaultProps = {
  autoPlay: false,
  children: null,
  className: '',
  controls: false,
  controlsList: '',
  id: '',
  listenInterval: 10000,
  loop: false,
  muted: false,
  onAbort: () => {},
  onCanPlay: () => {},
  onCanPlayThrough: () => {},
  onEnded: () => {},
  onError: () => {},
  onListen: () => {},
  onPause: () => {},
  onPlay: () => {},
  onSeeked: () => {},
  onVolumeChanged: () => {},
  onLoadedMetadata: () => {},
  preload: 'metadata',
  style: {},
  title: '',
  volume: 1.0,
};

ReactAudioPlayer.propTypes = {
  autoPlay: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string,
  controls: PropTypes.bool,
  controlsList: PropTypes.string,
  crossOrigin: PropTypes.string,
  id: PropTypes.string,
  listenInterval: PropTypes.number,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onAbort: PropTypes.func,
  onCanPlay: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onEnded: PropTypes.func,
  onError: PropTypes.func,
  onListen: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onSeeked: PropTypes.func,
  onVolumeChanged: PropTypes.func,
  preload: PropTypes.oneOf(['', 'none', 'metadata', 'auto']),
  src: PropTypes.string, // Not required b/c can use <source>
  style: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string,
  volume: PropTypes.number,
};

export default ReactAudioPlayer;