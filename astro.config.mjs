// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: ' Iot & AI Docs',
			social: {
				github: 'https://github.com/SthalinRivera',
			},
			sidebar: [
				{
					label: 'Brazos Roboticos 6° libertad',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: '¿Qué es un brazo robótico?', slug: 'brazos-roboticos/01-que-es' },
						{ label: 'Estructura del Brazo Robótico', slug: 'brazos-roboticos/03-estructura' },
						{ label: 'Alimentación y Cableado', slug: 'brazos-roboticos/04-alimentacion' },
						{ label: 'Uso del Controlador PCA9685', slug: 'brazos-roboticos/05-codigo-base' },
						{ label: 'Instalación del entorno de desarrollo', slug: 'brazos-roboticos/06-instalacion-ide' },
						{ label: 'Movimiento barrido secuencial', slug: 'brazos-roboticos/07-movimiento-secuencial' },
						{ label: 'Moviendo los servomotores en posiciones diferentes', slug: 'brazos-roboticos/08-movimiento-posiciones-diferentes' },
					],
				},

				{
					label: 'Jetson nano developer Kid NVIDIA',
					items: [
						{ label: 'Introducción', slug: 'jetson-nano/01-introduccion' },
						{ label: 'Configuración de Entorno', slug: 'jetson-nano/02-configuracion-entorno-desarrollo' },
						{ label: 'Instalación y Configuración Inicial', slug: 'jetson-nano/03-instalacion-y-configuracion-inicial' },
						{ label: 'Desarrollo y Ejecución de Modelos de IA', slug: 'jetson-nano/04-desarrollo-y-ejecucion-modelos-ia' },
					],
				},
				{
					label: 'Impresora 3D ',
					items: [
						{ label: 'Introducción', slug: 'impresora3d/01-introduccion' },
					],
				},
				{
					label: 'Recomendacion',
					autogenerate: { directory: 'recomendaciones' },
				},
				{
					label: 'Referencias',
					autogenerate: { directory: 'referencias' },
				},
			],
		}),
	],
});
