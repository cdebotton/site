'use client';

import { indigo, slate, indigoDark, plumDark, red } from '@radix-ui/colors';
import { Instances, Instance, Edges } from '@react-three/drei';
import {
	Canvas,
	Props as CanvasProps,
	useFrame,
	useThree,
	type Vector3,
} from '@react-three/fiber';
import { useRef, useMemo, useEffect, ReactNode } from 'react';

import { useTheme } from './Theme';

import type { Mesh, Group, Object3D } from 'three';

import { useAnimate } from '@/libs/useAnimate';

export default function Scene(props: Pick<CanvasProps, 'style'>) {
	let [theme] = useTheme();
	let fogColor = theme.darkMode ? indigoDark.indigo1 : indigo.indigo1;

	return (
		<Canvas
			orthographic
			camera={{ zoom: 80, position: [10, 20, 20] }}
			shadows="soft"
			eventSource={document.body}
			{...props}
		>
			<CameraZoom />
			<directionalLight />
			<pointLight castShadow position={[0, 10, 0]} intensity={1} />
			<fog attach="fog" near={20} far={45} color={fogColor} />
			<RotatingGroup position={[0, -2, 0]}>
				<SolarSystem>
					<Planet />
					<Moons />
				</SolarSystem>
				<Floor />
			</RotatingGroup>
		</Canvas>
	);
}

function RotatingGroup({
	children,
	position,
}: {
	children?: ReactNode;
	position: Vector3;
}) {
	let ref = useRef<Group>(null!);

	useFrame(({ pointer }) => {
		ref.current.rotation.y = (Math.PI / 2) * pointer.x;
	});

	return (
		<group ref={ref} position={position}>
			{children}
		</group>
	);
}

function CameraZoom() {
	let { camera } = useThree();

	useEffect(() => {
		function handler() {
			camera.zoom = Math.min(50 * (innerWidth / 600), 50);
			camera.updateProjectionMatrix();
		}

		window.addEventListener('resize', handler);
		window.addEventListener('orientationchange', handler);

		handler();

		return () => {
			window.removeEventListener('resize', handler);
			window.removeEventListener('orientationchange', handler);
		};
	}, [camera]);

	return null;
}

function Floor() {
	let [theme] = useTheme();

	let gridColor = theme.darkMode ? 'hsl(229, 24.0%, 1.95%)' : indigo.indigo7;
	let crossColor = theme.darkMode ? 'hsl(229, 24.0%, 3.83%)' : slate.slate5;
	let shadowColor = theme.darkMode ? '#000' : indigo.indigo1;

	let crosses = useMemo(() => {
		return Array.from({ length: 23 }, (_, y) => {
			return Array.from({ length: 23 }, (_, x) => {
				return {
					id: y * 23 + x,
					x,
					y,
					delay: (Math.abs(23 / 2 - y) + Math.abs(23 / 2 - x)) / 10,
				};
			});
		}).flat();
	}, []);

	return (
		<group position={[0, -4, 0]}>
			<gridHelper args={[100, 100, gridColor, gridColor]} />
			<Instances>
				<planeGeometry args={[0.086, 0.35]} />
				<meshBasicMaterial color={crossColor} />
				{crosses.map(({ id, ...props }) => (
					<Cross key={id} {...props} />
				))}
			</Instances>
			<mesh
				position={[0, -0.02, 0]}
				receiveShadow
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<planeGeometry args={[100, 100]} />
				<shadowMaterial opacity={0.2} color={shadowColor} />
			</mesh>
		</group>
	);
}

function Cross({ x, y, delay }: { x: number; y: number; delay: number }) {
	let ref = useRef<Group>(null!);

	useAnimate(
		ref,
		(value, group) => {
			group.scale.setScalar(value);
			group.position.setY((1 - value) * 2);
			group.rotation.y = (Math.PI / 2) * (1 - value);
		},
		{ duration: 2, delay },
	);

	return (
		<group
			scale={[0, 0, 0]}
			ref={ref}
			position={[
				x * 3 - Math.floor(23 / 3) * 3,
				0.02,
				y * 3 - Math.floor(23 / 3) * 3,
			]}
		>
			<Instance rotation={[Math.PI / -2, 0, 0]} />
			<Instance rotation={[Math.PI / -2, 0, Math.PI / 2]} />
		</group>
	);
}
function SolarSystem({ children }: { children?: ReactNode }) {
	let ref = useRef<Group>(null!);

	useAnimate(
		ref,
		(value, group) => {
			group.position.y = Math.sin(value * 0.75) * 4 + 2;
		},
		{
			duration: 2,
			easing: 'ease-in-out',
			repeat: Infinity,
			direction: 'alternate',
		},
	);

	return <group ref={ref}>{children}</group>;
}

function Planet() {
	let [theme] = useTheme();
	let ref = useRef<Mesh>(null!);

	let color = theme.darkMode ? plumDark.plum2 : red.red9;
	let edgeColor = theme.darkMode ? plumDark.plum10 : red.red11;

	useAnimate(
		ref,
		(value, group) => {
			group.rotation.y = Math.sin(value * Math.PI * 2);
			group.rotation.z = Math.cos(value * Math.PI * 2);
		},
		{
			duration: 10,
			easing: 'linear',
			repeat: Infinity,
		},
	);

	useAnimate(
		ref,
		(value, group) => {
			group.scale.setScalar(value * 3);
		},
		{
			duration: 2,
			easing: 'ease-in-out',
			delay: 0.75,
		},
	);

	return (
		<mesh ref={ref} castShadow>
			<octahedronGeometry args={[1, 2]} />
			<meshToonMaterial transparent opacity={0.85} color={color} />
			<Edges color={edgeColor} />
		</mesh>
	);
}

function Moons() {
	let moons = useMemo(() => {
		return Array.from({ length: 500 }, (_, i) => {
			return {
				index: 500 - i,
				scale: Math.random() * 0.378 + 0.015,
				distance: Math.random() * 5 + 1,
				speed: (i / 500) * 1.2,
				seed: Math.random() * 5235928,
				delay: (i / 1000) * 25,
			};
		});
	}, []);

	return (
		<Instances castShadow>
			<sphereGeometry />
			<meshToonMaterial />
			{moons.map(({ index, ...moon }) => (
				<Moon key={index} {...moon} />
			))}
		</Instances>
	);
}

function Moon({
	scale,
	distance,
	speed,
	seed,
	delay,
}: {
	scale: number;
	distance: number;
	speed: number;
	seed: number;
	delay: number;
}) {
	let ref = useRef<Object3D>(null!);
	const RADIUS = 3;

	useAnimate(
		ref,
		(value, instance) => {
			instance.scale.setScalar(value * scale);
		},
		{ duration: 2, delay },
	);

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime() * speed + seed;
		ref.current.position.set(
			-(RADIUS + distance) * Math.cos(t),
			5 * Math.cos(t),
			-(RADIUS + distance) * Math.sin(t),
		);
	});

	let [theme] = useTheme();

	let color = theme.darkMode ? plumDark.plum1 : 'hsl(226, 75.4%, 98.5%)';

	return <Instance ref={ref} color={color} />;
}
