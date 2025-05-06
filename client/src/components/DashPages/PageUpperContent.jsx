import React from 'react';

const PageUpperContent = ({ icon: Icon, title }) => {
    return (
        <div className="flex items-center mb-4">
            {Icon && <Icon className="text-blue-600 h-8 w-8" />}
            <h1 className="text-blue-500 font-semibold uppercase text-xl pl-4">{title}</h1>
        </div>
    );
};

export default PageUpperContent;
