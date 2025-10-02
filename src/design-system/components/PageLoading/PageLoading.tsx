import React from "react";

interface PageLoadingProps {
  /** Whether the loading component is visible */
  visible?: boolean;
  /** Custom message to display below the logo */
  message?: string;
  /** Duration of the fade animation in milliseconds */
  animationDuration?: number;
  /** Whether to show skeleton loading effect instead of fade animation */
  skeleton?: boolean;
  /** Logo variant to display - 'symbol' for the geometric symbol or 'text' for the full Wakecap text logo */
  logoVariant?: "symbol" | "text";
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  visible = true,
  message = "Loading...",
  animationDuration = 2000,
  skeleton = false,
  logoVariant = "symbol",
}) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Wakecap Logo with Animation */}
      <div
        style={{
          animation: skeleton ? "none" : `logoFade ${animationDuration}ms ease-in-out infinite`,
          marginBottom: message ? "24px" : "0",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          {logoVariant === "symbol" ? (
            <svg
              width="120"
              height="80"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              }}
            >
              <path
                d="M24 6.00746V0.5H18.4134L16.581 3.23134L14.6592 0.5H9.2514L7.41899 3.23134L5.49721 0.5H0V6.00746L4.64804 15.5H10.1006L11.9777 12.7687L13.8101 15.5H19.3966L24 6.00746Z"
                fill={skeleton ? "#000000" : "currentColor"}
                style={{
                  animation: skeleton
                    ? "none"
                    : `colorFade ${animationDuration}ms ease-in-out infinite`,
                }}
              />
            </svg>
          ) : (
            <svg
              width="200"
              height="60"
              viewBox="0 0 631.39 96.56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              }}
            >
              <g>
                <path
                  d="M120.31,3.75h24.1l-25.55,86.97h-34.54l-10.06-68.71-10.44,68.71H29.04L4.39,3.75h24.85l18.43,67.21L58.24,3.75h32.68l10.19,67.09L120.31,3.75Z"
                  fill={skeleton ? "#000000" : "currentColor"}
                  style={{
                    animation: skeleton
                      ? "none"
                      : `colorFade ${animationDuration}ms ease-in-out infinite`,
                  }}
                />
                <path
                  d="M192.57,90.71l-5.09-17.77h-31.81l-5.09,17.77h-22.99L153.93,3.75h36.03l26.34,86.97h-23.73ZM160.64,55.31h21.87l-10.93-38.52-10.93,38.52Z"
                  fill={skeleton ? "#000000" : "currentColor"}
                  style={{
                    animation: skeleton
                      ? "none"
                      : `colorFade ${animationDuration}ms ease-in-out infinite`,
                  }}
                />
                <path
                  d="M303.66,90.71h-27.83l-25.07-35.63h-7.86l.1,35.63h-23.36V3.75h23.36v34.17h7.37l22.99-34.17h27.33l-31.68,41.87,34.66,45.1Z"
                  fill={skeleton ? "#000000" : "currentColor"}
                  style={{
                    animation: skeleton
                      ? "none"
                      : `colorFade ${animationDuration}ms ease-in-out infinite`,
                  }}
                />
                <path
                  d="M306.99,90.71V3.75h74.55v18.26h-51.19v15.9h41v17.15h-41v17.39h52.93v18.26h-76.28Z"
                  fill={skeleton ? "#000000" : "currentColor"}
                  style={{
                    animation: skeleton
                      ? "none"
                      : `colorFade ${animationDuration}ms ease-in-out infinite`,
                  }}
                />
              </g>
              <path
                d="M383.81,47.22c0-13.83,3.75-24.79,11.25-32.87,7.5-8.08,17.83-12.12,31-12.12,11.18,0,20.17,2.73,26.97,8.2,6.79,5.47,10.94,12.97,12.43,22.49l-22.37,1.86c-.91-4.14-2.88-7.43-5.9-9.88-3.02-2.44-6.73-3.67-11.12-3.67s-7.93,1.26-10.87,3.79c-2.94,2.53-5.01,5.68-6.21,9.44-1.2,3.77-1.8,8.02-1.8,12.74,0,7.95,1.82,14.27,5.47,18.95,3.64,4.68,8.53,7.02,14.66,7.02,4.64,0,8.43-1.37,11.37-4.1,2.94-2.73,4.87-6.25,5.78-10.56l22.49,1.37c-1.41,10.44-5.47,18.43-12.18,23.98-6.71,5.55-15.87,8.33-27.46,8.33-13.67,0-24.34-4.02-32-12.05-7.66-8.03-11.49-19.01-11.49-32.93Z"
                fill={skeleton ? "#000000" : "currentColor"}
                style={{
                  animation: skeleton
                    ? "none"
                    : `colorFade ${animationDuration}ms ease-in-out infinite`,
                }}
              />
              <path
                d="M528.21,90.71l-5.09-17.77h-31.81l-5.1,17.77h-22.99L489.56,3.73h36.04l26.34,86.99h-23.74ZM496.28,55.3h21.87l-10.94-38.52-10.94,38.52Z"
                fill={skeleton ? "#000000" : "currentColor"}
                style={{
                  animation: skeleton
                    ? "none"
                    : `colorFade ${animationDuration}ms ease-in-out infinite`,
                }}
              />
              <path
                d="M555.97,90.71V3.73h40.64c4.55,0,8.76.52,12.61,1.55,3.85,1.04,7.39,2.63,10.62,4.78,3.23,2.16,5.78,5.16,7.64,9.01,1.86,3.85,2.8,8.35,2.8,13.48,0,18.39-10.98,27.59-32.93,27.59h-18.02v30.57h-23.36ZM579.33,42.25h14.42c8.78,0,13.17-3.23,13.17-9.69s-4.39-9.69-13.17-9.69h-14.42v19.39Z"
                fill={skeleton ? "#000000" : "currentColor"}
                style={{
                  animation: skeleton
                    ? "none"
                    : `colorFade ${animationDuration}ms ease-in-out infinite`,
                }}
              />
            </svg>
          )}
          {skeleton && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2), transparent)",
                animation: `skeletonShimmer ${animationDuration}ms ease-in-out infinite`,
                pointerEvents: "none",
                borderRadius: "4px",
              }}
            />
          )}
        </div>
      </div>

      {/* Loading Message */}
      {message && (
        <div
          style={{
            color: "#6b7280",
            fontSize: "14px",
            fontWeight: "500",
            letterSpacing: "0.025em",
            animation: `textFade ${animationDuration}ms ease-in-out infinite`,
          }}
        >
          {message}
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @keyframes logoFade {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes colorFade {
            0%, 100% {
              color: #9ca3af; /* Light gray */
            }
            50% {
              color: #000000; /* Black */
            }
          }

          @keyframes textFade {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.8;
            }
          }

          @keyframes skeletonPulse {
            0%, 100% {
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes skeletonShimmer {
            0% {
              left: -100%;
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              left: 100%;
              opacity: 0;
            }
          }

          @keyframes skeletonColorFade {
            0%, 100% {
              color: #d1d5db; /* Light gray */
            }
            50% {
              color: #6b7280; /* Medium gray */
            }
          }

        `}
      </style>
    </div>
  );
};

export default PageLoading;
