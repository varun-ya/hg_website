import { useState } from 'react';

const SparkleIcon = ({ size = 12, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <g style={{ mixBlendMode: "luminosity" }}>
            <g filter="url(#filter0_i_sparkle)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.86247 0.145966C5.93745 0.0636007 6.06606 0.0635969 6.14104 0.145962C7.00239 1.09215 7.36117 2.33793 7.21343 3.53119C7.6848 3.19604 8.2612 2.99897 8.88361 2.99895C8.94736 2.99895 8.99927 3.05066 8.99685 3.11437C8.97419 3.71103 8.77671 4.26443 8.45424 4.7237C9.6718 4.56061 10.9489 4.94689 11.8846 5.88256C11.9483 5.94631 11.9485 6.04998 11.8823 6.11126C10.9146 7.00817 9.62571 7.37272 8.39967 7.20054C8.73823 7.65241 8.9528 8.20262 8.99248 8.7992C8.99987 8.91034 8.90875 9.00146 8.79761 8.99407C8.20202 8.95446 7.65265 8.74055 7.20121 8.40297C7.37065 9.61609 7.01468 10.8904 6.13749 11.854C6.06251 11.9364 5.93389 11.9364 5.85891 11.854C4.98242 10.8912 4.6263 9.61811 4.79477 8.40586C4.32236 8.75791 3.74317 8.97471 3.11622 8.99852C3.05251 9.00094 3.0008 8.94903 3.0008 8.88528C3.00081 8.26185 3.19851 7.68456 3.53467 7.21277C2.3284 7.36307 1.06813 6.99577 0.117652 6.11486C0.0515287 6.05358 0.05168 5.94991 0.11543 5.88616C1.05179 4.94984 2.32999 4.56369 3.54831 4.72768C3.23985 4.28982 3.04517 3.76605 3.00756 3.20064C3.00017 3.0895 3.09129 2.99837 3.20243 3.00576C3.79795 3.04537 4.34726 3.25919 4.79866 3.59669C4.62933 2.38367 4.98535 1.10948 5.86247 0.145966ZM5.99971 5.99443C5.99845 5.99636 5.99668 5.99789 5.99456 5.99883C5.99467 5.99951 5.99474 6.00019 5.99477 6.00088C5.99691 6.00186 5.99868 6.00346 5.99992 6.00544H6.00021C6.00146 6.00349 6.00326 6.00192 6.0054 6.00096C6.00527 6.00026 6.00523 5.99954 6.00519 5.99883C6.00307 5.99788 6.00125 5.99637 6 5.99443H5.99971Z"
                    fill="url(#paint0_linear_sparkle)"
                />
            </g>
        </g>
        <defs>
            <filter id="filter0_i_sparkle" x="0.0703125" y="0.0859375" width="12.3636" height="12.3323" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="0.504202" dy="0.504202" />
                <feGaussianBlur stdDeviation="0.535714" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.694118 0 0 0 0 0.168627 0 0 0 1 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_sparkle" />
            </filter>
            <linearGradient id="paint0_linear_sparkle" x1="6" y1="0" x2="6" y2="11.1013" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F38858" />
                <stop offset="1" stopColor="#FFCB79" />
            </linearGradient>
        </defs>
    </svg>
);

export default function ApiFeaturesSection() {
    const [activeAccordion, setActiveAccordion] = useState(0);

    const deploymentOptions = [
        {
            id: "dashboard",
            title: "Student Dashboard UI",
            description: "Track your progress, manage sessions, and access learning materials",
            image: "https://assets.homeguruworld.com/tr:f-auto/assets/prod-homeguru/products/built-for-01.png"
        },
        {
            id: "live-class",
            title: "Live Class Interface",
            description: "Interactive whiteboard, screen sharing, and real-time collaboration",
            image: "https://assets.homeguruworld.com/tr:f-auto/assets/prod-homeguru/products/built-for-02.png"
        },
        {
            id: "progress",
            title: "Progress Tracking System",
            description: "Monitor your learning journey with detailed analytics and insights",
            image: "https://assets.homeguruworld.com/tr:f-auto/assets/prod-homeguru/products/built-for-03.png"
        }
    ];

    const developerFeatures = [
        {
            id: "chat-notes",
            title: "Chat & Notes System",
            description: "Communicate with your Guru, share files, and take notes during sessions. Everything you need in one place.",
            subItems: [
                { title: "Real-time messaging" },
                { title: "File sharing & resources" },
                { title: "Session recordings" }
            ]
        }
    ];

    return (
        <section className="flex flex-col items-center gap-12 md:gap-20 py-20 px-4 max-w-[1280px] mx-auto w-full">
            <div className="flex flex-col items-center text-center gap-6 w-full">
                <h2 className="font-season-mix text-3xl md:text-[42px] text-tx leading-[1.2]">
                    Built For Serious Learners.
                </h2>
            </div>

            {/* Deployment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {deploymentOptions.map((option) => (
                    <div
                        key={option.id}
                        className="group flex flex-row items-center gap-5 bg-white p-2 md:p-4 border border-[#f0f0f0] rounded-[26px] w-full overflow-hidden"
                    >
                        <div className="flex justify-center items-center w-[100px] h-[100px] overflow-hidden shrink-0 bg-sf rounded-2xl">
                            <img
                                src={option.image}
                                alt={option.title}
                                className="w-fit h-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <h3 className="font-matter font-medium text-[#3d3d3d] text-[18px] leading-[1.3]">
                                {option.title}
                            </h3>
                            <p className="font-matter text-[#666] text-sm md:text-base leading-normal">
                                {option.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Developer Experience Card (Large) */}
            <div className="flex md:flex-row flex-col gap-6 bg-white p-3 md:p-6 border border-[#f0f0f0] rounded-[24px] md:rounded-[48px] w-full overflow-hidden">
                <div className="flex flex-col flex-1 md:justify-between gap-7 md:gap-0 p-3 md:p-6 md:min-h-[400px]">
                    <div className="flex flex-col gap-2.5 md:gap-4">
                        <h3 className="max-w-[480px] font-matter font-medium text-[24px] text-tx md:text-[28px] leading-[130%] tracking-[-0.28px]">
                            {developerFeatures[0].title}
                        </h3>
                        <p className="font-matter text-tx-tertiary md:text-[15px] text-sm leading-normal">
                            {developerFeatures[0].description}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        {developerFeatures[0].subItems.map((item, i) => (
                            <div key={i} className="border-[#e8e8e8] border-t first:border-t-0">
                                <div className="flex items-start md:items-center gap-3 py-4">
                                    <div className="py-1.5 shrink-0">
                                        <SparkleIcon />
                                    </div>
                                    <h4 className="font-matter font-medium text-tx-secondary text-base md:text-lg leading-normal md:leading-[1.3]">
                                        {item.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative flex-1 bg-sf border border-[#f0f0f0] rounded-[20px] md:rounded-[32px] overflow-hidden min-h-[300px] md:min-h-0 flex items-center justify-center p-8">
                    <img
                        src="https://assets.homeguruworld.com/tr:f-auto/assets/prod-homeguru/products/developer-experience.png"
                        alt="Developer Experience"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
}
