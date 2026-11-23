import { Boxes } from 'lucide-react';
import {
    FaReact,
    FaKey,
    FaEnvelope
} from 'react-icons/fa';
import {
    SiTailwindcss,
    SiVite,
    SiFramer,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiCloudinary,
    SiReactrouter,
    SiSocketdotio,
    SiSupabase,
    SiPostgresql,
    SiZod,
    SiDeno,
    SiMercadopago,
    SiGoogle
} from "react-icons/si";
import { LuTabletSmartphone } from "react-icons/lu";
import { projectCatalog } from './projectsCatalog';

export const techIcons = {
    React: <FaReact />,
    Tailwind: <SiTailwindcss />,
    Nodejs: <SiNodedotjs />,
    Express: <SiExpress />,
    MongoDB: <SiMongodb />,
    Cloudinary: <SiCloudinary />,
    JWT: <FaKey />,
    Zustand: <Boxes />,
    Zod: <SiZod />,
    Supabase: <SiSupabase />,
    PostgreSQL: <SiPostgresql />,
    Deno: <SiDeno />,
    Framer: <SiFramer />,
    Vite: <SiVite />,
    'Socket.IO': <SiSocketdotio />,
    'Mercado Pago': <SiMercadopago />,
    'Google OAuth': <SiGoogle />,
    EmailJS: <FaEnvelope />,
    Responsive: <LuTabletSmartphone />,
    ReactRouter: <SiReactrouter />
};

export const projectList = projectCatalog;
