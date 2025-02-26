import dynamic from "next/dynamic";

const Motion = {
	div: dynamic(() => import("framer-motion").then((mod) => mod.motion.div), {
		ssr: false,
	}),
	form: dynamic(() => import("framer-motion").then((mod) => mod.motion.form), {
		ssr: false,
	}),
	p: dynamic(() => import("framer-motion").then((mod) => mod.motion.p), {
		ssr: false,
	}),
	input: dynamic(
		() => import("framer-motion").then((mod) => mod.motion.input),
		{
			ssr: false,
		},
	),
	button: dynamic(
		() => import("framer-motion").then((mod) => mod.motion.button),
		{
			ssr: false,
		},
	),
	h1: dynamic(() => import("framer-motion").then((mod) => mod.motion.h1), {
		ssr: false,
	}),
};

const MotionDiv = Motion.div;
const MotionForm = Motion.form;
const MotionP = Motion.p;
const MotionInput = Motion.input;
const MotionButton = Motion.button;
const MotionH1 = Motion.h1;

// Animasyon varyantları
export const fadeIn = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.5 },
	},
};

export const slideIn = {
	hidden: { x: -50, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 15,
		},
	},
};

export const floatingAnimation = {
	initial: { y: 0 },
	animate: {
		y: [0, -10, 0],
		transition: {
			duration: 3,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
		},
	},
};

export const pulseAnimation = {
	initial: { scale: 1, opacity: 0.8 },
	animate: {
		scale: [1, 1.05, 1],
		opacity: [0.8, 1, 0.8],
		transition: {
			duration: 2,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
		},
	},
};

export const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const formItemVariant = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 100,
		},
	},
};

export { MotionDiv, MotionForm, MotionP, MotionInput, MotionButton, MotionH1 };
