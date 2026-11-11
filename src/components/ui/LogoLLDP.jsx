import { useTheme } from '../../hooks/useTheme';

/**
 * LogoLLDP — Componente Oficial del Sistema de Identidad Visual LLDP
 */
export default function LogoLLDP({
  variant = 'full',
  size = 36,
  className = ''
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (variant === 'icon') {
    return (
      <img
        src="/brand/LLDP_App_Icon_Color.png"
        alt="LLDP Logo Icon"
        width={size}
        height={size}
        className={`lldp-brand-icon rounded-xl select-none ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          display: 'inline-block',
          verticalAlign: 'middle'
        }}
        loading="eager"
      />
    );
  }

  if (variant === 'mark' || variant === 'monogram') {
    return (
      <img
        src="/brand/LLDP_Monograma_Color.svg"
        alt="LLDP Monograma Oficial"
        width={size}
        height={size}
        className={`lldp-brand-mark select-none ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          display: 'inline-block',
          verticalAlign: 'middle'
        }}
        loading="eager"
      />
    );
  }

  // Full horizontal lockup (Lautaro Leal - Desarrollo de Software - lautarolealdev.com)
  const lockupSrc = isLight
    ? '/brand/LLDP_Lockup_Color_Fondo_Claro.svg'
    : '/brand/LLDP_Lockup_Color_Fondo_Oscuro.svg';

  return (
    <img
      src={lockupSrc}
      alt="Lautaro Leal Del Prete — LLDP Desarrollo de Software"
      height={size}
      className={`lldp-brand-lockup select-none ${className}`}
      style={{
        height: `${size}px`,
        width: 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
      loading="eager"
    />
  );
}
