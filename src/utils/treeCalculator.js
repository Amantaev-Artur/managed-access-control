const calculateDepth = (groupId, groups) => {
  let depth = 0;
  let currentGroup = groups?.find(group => group.id === groupId);

  while (currentGroup && currentGroup.parentId !== null) {
    depth++;
    currentGroup = groups.find(group => group.id === currentGroup.parentId);
  }
  return depth;
};

const calculateMargin = (group, groups) => {
  const depth = calculateDepth(group.id, groups);
  return `${depth * 20}px`;
};

const isNested = (group) => group.parentId !== null;

export { calculateMargin, isNested };