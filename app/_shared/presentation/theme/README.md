# Paleta de Colores - Bazar Oportunidades

## Colores Principales

### Primary (Azul)
- **Main**: `#2563eb` - Color principal para acciones y elementos destacados
- **Light**: `#3b82f6` - Variante clara
- **Dark**: `#1e40af` - Variante oscura

### Secondary (Verde)
- **Main**: `#10b981` - Color secundario para éxito y oportunidades
- **Light**: `#34d399` - Variante clara
- **Dark**: `#059669` - Variante oscura

## Uso en Componentes MUI

```tsx
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Usar colores del tema directamente
<Button color="primary">Botón Principal</Button>
<Button color="secondary">Botón Secundario</Button>

// Acceder a colores del tema programáticamente
const theme = useTheme();
const primaryColor = theme.palette.primary.main;
```

## Uso en CSS/Tailwind

Las variables CSS están disponibles en `globals.css`:

```css
.my-element {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
```

## Colores del Sistema

- **Error**: `#ef4444` - Para mensajes de error
- **Warning**: `#f59e0b` - Para advertencias
- **Info**: `#3b82f6` - Para información
- **Success**: `#10b981` - Para éxito

## Escala de Grises

Disponible desde `--color-grey-50` hasta `--color-grey-900` para diferentes niveles de contraste y jerarquía visual.
