Nested Drag and Drop List
This project implements a nested drag and drop list using React, TypeScript, and Tailwind CSS. It allows users to reorder items within a hierarchical list structure through drag and drop functionality.


.
├── .gitignore              # Specifies intentionally untracked files that Git should ignore
├── eslint.config.js        # Configuration file for ESLint, a JavaScript linting tool
├── index.html              # Main HTML file
├── package.json            # Contains metadata about the project and its dependencies
├── postcss.config.js       # Configuration file for PostCSS, a tool for transforming CSS
├── README.md               # Documentation for the project
├── tailwind.config.ts      # Configuration file for Tailwind CSS, a utility-first CSS framework
├── tsconfig.app.json       # TypeScript configuration file for the application
├── tsconfig.json           # Root TypeScript configuration file
├── tsconfig.node.json      # TypeScript configuration file for Node.js related tasks
├── vite.config.ts          # Configuration file for Vite, a build tool
├── public/                 # Directory for public assets
│   └── vite.svg            # Vite logo
├── src/                    # Source code directory
│   ├── App.css             # CSS file for the main App component
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global CSS file
│   ├── main.tsx            # Entry point for the React application
│   ├── vite-env.d.ts       # TypeScript declaration file for Vite environment variables
│   ├── assets/             # Directory for assets
│   │   └── react.svg       # React logo
│   ├── components/         # Directory for reusable components
│   │   ├── ExpandToggle.tsx  # Component for toggling the expand/collapse state of a list item
│   │   └── MessageIcon.tsx   # Component for displaying a message icon
│   ├── data/               # Directory for data
│   │   └── inital-items.ts   # Initial data for the nested list
│   ├── features/           # Directory for features
│   │   └── nested-list/     # Directory for the nested list feature
│   │       ├── ListItem.tsx          # Component for rendering a single list item
│   │       └── NestedDragDropList.tsx  # Component for the nested drag and drop list
│   ├── hooks/              # Directory for custom React hooks
│   │   └── use-nested-drag-drop.tsx  # Custom hook for managing the nested drag and drop functionality
│   ├── types/              # Directory for TypeScript types
│   │   └── item.ts           # TypeScript type definition for a list item
│   └── utils/              # Directory for utility functions
│       ├── cn.ts             # Utility function for conditionally joining class names
│       └── item-helpers.ts   # Utility functions for manipulating list items
└── ...