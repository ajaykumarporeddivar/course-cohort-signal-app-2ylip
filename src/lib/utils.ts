export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getFullName(user: { name: string }): string {
  return user.name;
}

export function getAvatarUrl(user: { avatar: string }): string {
  return user.avatar;
}

export function getRoleLabel(user: { role: string }): string {
  switch (user.role) {
    case 'Program Director':
      return 'Program Director';
    case 'Course Operations Manager':
      return 'Course Operations Manager';
    case 'Admin':
      return 'Admin';
    default:
      return 'Unknown';
  }
}

export function getPlanLabel(user: { plan: string }): string {
  switch (user.plan) {
    case 'Pro':
      return 'Pro';
    case 'Starter':
      return 'Starter';
    default:
      return 'Unknown';
  }
}