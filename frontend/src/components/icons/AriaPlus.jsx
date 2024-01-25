import React from 'react';

const AriaPlusIcon = (props) => {
  const { fill = 'currentColor', secondaryFill, className, onClick } = props;

  return (
    <svg className={className} onClick={onClick} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={fill} />
      {secondaryFill && (
        <path d="M12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill={secondaryFill} />
      )}
    </svg>
  );
};

export default AriaPlusIcon;
