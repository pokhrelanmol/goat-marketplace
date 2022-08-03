module.exports = {
    content: [
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    plugins: [require("flowbite/plugin")],
    theme: {
        extend: {
            colors: {
                primaryDark: "#363443",
                secondaryPink: "#F69987",
            },
        },
    },
};
