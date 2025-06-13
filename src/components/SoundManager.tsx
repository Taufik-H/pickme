import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const SoundManager = forwardRef((props, ref) => {
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const memeSoundRef = useRef<HTMLAudioElement>(null);
  const rizzSoundRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => ({
    playClickSound: () => {
      if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0;
        clickSoundRef.current.play().catch(() => {});
      }
    },
    playMemeSound: () => {
      if (memeSoundRef.current) {
        memeSoundRef.current.currentTime = 0;
        memeSoundRef.current.play().catch(() => {});
      }
    },
    playRizzSound: () => {
      if (rizzSoundRef.current) {
        rizzSoundRef.current.currentTime = 0;
        rizzSoundRef.current.play().catch(() => {});
      }
    },
  }));

  return (
    <>
      <audio
        ref={clickSoundRef}
        preload="auto"
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcbji"
      />
      <audio
        ref={memeSoundRef}
        preload="auto"
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcbji"
      />
      <audio
        ref={rizzSoundRef}
        preload="auto"
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAkUXrTp66hVFApGn+DyvmMcbji"
      />
    </>
  );
});

SoundManager.displayName = 'SoundManager';

export default SoundManager;