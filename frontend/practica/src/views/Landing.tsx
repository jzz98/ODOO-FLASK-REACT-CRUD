import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <section className="landing">
      <div className="landing-hero">
        <span className="landing-chip">Seguridad informática</span>
        <h1>Protege tu organización con inteligencia y control.</h1>
        <p>
          Un panel único para gestionar accesos, monitorear actividad y responder
          rápido ante incidentes. Menos riesgo, más claridad.
        </p>
        <div className="landing-actions">
          <Link to="/register" className="primary">
            Crear cuenta
          </Link>
          <Link to="/login" className="ghost">
            Iniciar sesión
          </Link>
        </div>
        <div className="landing-stats">
          <div>
            <strong>24/7</strong>
            <span>Monitoreo</span>
          </div>
          <div>
            <strong>0.8s</strong>
            <span>Alertas</span>
          </div>
          <div>
            <strong>+120</strong>
            <span>Integraciones</span>
          </div>
        </div>
      </div>
      <div className="landing-panel">
        <div className="panel-card">
          <h3>Centro de respuesta</h3>
          <p>Incidentes clasificados, equipos sincronizados y acciones claras.</p>
        </div>
        <div className="panel-card">
          <h3>Accesos por rol</h3>
          <p>Control granular de permisos con auditoría automática.</p>
        </div>
        <div className="panel-card">
          <h3>Compliance ágil</h3>
          <p>Reportes listos para normativa y clientes empresariales.</p>
        </div>
      </div>
    </section>
  )
}
