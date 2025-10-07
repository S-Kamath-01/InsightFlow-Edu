/**
 * Sidebar navigation component
 * Provides role-based navigation menu
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import {
  HomeIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedRoles?: string[];
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Students',
    path: '/students',
    icon: UsersIcon,
  },
  {
    name: 'Risk Panel',
    path: '/risk',
    icon: ExclamationTriangleIcon,
  },
  {
    name: 'Interventions',
    path: '/interventions',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'Feedback',
    path: '/feedback',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Admin',
    path: '/admin',
    icon: CogIcon,
    allowedRoles: ['academic_head', 'it'],
  },
];

export const Sidebar: React.FC = () => {
  const { role } = useAuth();

  const filteredItems = navItems.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(role || '')
  );

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
