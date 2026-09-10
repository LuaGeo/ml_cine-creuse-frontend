import { useEffect, useState } from "react";

const DEFAULT_MESSAGE = "Patientez, chargement en cours (environ une minute)…";

/**
 * Barre de progression affichée pendant l'attente (cold start du backend,
 * chargement des recommandations…). La barre se remplit linéairement jusqu'à
 * 95 % sur `durationMs`, puis reste là : elle disparaît quand les données
 * arrivent et que le composant est démonté.
 *
 * `inline` : rend la barre dans le flux de la page (pas d'overlay plein écran),
 * pour une zone précise comme le carrousel de recommandations.
 */
const LoadingProgress = ({
  message = DEFAULT_MESSAGE,
  hint,
  durationMs = 60000,
  inline = false,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(95, (elapsed / durationMs) * 100));
    }, 300);
    return () => clearInterval(id);
  }, [durationMs]);

  const box = (
    <div className={`loading-progress${inline ? " loading-progress--inline" : ""}`}>
      <p className="loading-progress-message">{message}</p>
      <div
        className="loading-progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label={message}
      >
        <div
          className="loading-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      {hint && <p className="loading-progress-hint">{hint}</p>}
    </div>
  );

  if (inline) return box;

  return <div className="loading-progress-overlay">{box}</div>;
};

export default LoadingProgress;
