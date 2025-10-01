import React from "react";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface AdvertisementCardProps {
  banner: string | React.ReactNode;
  header: string;
  features: string[];
  buttonText: string;
  onButtonClick?: () => void;
}

export const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  banner,
  header,
  features,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        border: "1px solid var(--Secondary-200, #E5E7EB)",
        padding: 0,
        overflow: "hidden",
        maxWidth: 420,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: 160,
          background: "#f7f8fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {typeof banner === "string" ? (
          <img
            src={banner}
            alt="Advertisement Banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              console.error("Failed to load banner image:", banner);
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          banner
        )}
      </div>
      {/* Header + Badge */}
      <div
        style={{
          padding: "24px 24px 0 24px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            color: "var(--Secondary-900, #111827)",
            fontFamily: "Figtree",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          {header}
        </span>
        <span
          style={{
            background: "var(--Primary-700, #1D4ED8)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "Figtree",
            borderRadius: 999,
            padding: "2px 10px",
            marginLeft: 4,
            letterSpacing: 0.2,
            display: "inline-block",
          }}
        >
          New
        </span>
      </div>
      {/* Features */}
      <ul style={{ padding: "16px 24px 0 24px", margin: 0, listStyle: "none", flex: 1 }}>
        {features.map((feature, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span
              style={{
                color: "var(--Primary-700, #1D4ED8)",
                textAlign: "center",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily: "Font Awesome 6 Pro",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: 900,
                lineHeight: "normal",
                letterSpacing: 0.46,
                textTransform: "capitalize",
                display: "inline-block",
                width: 16,
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              style={{
                color: "var(--Secondary-900, #111827)",
                fontFamily: "Figtree",
                fontSize: 13,
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
      {/* CTA Button */}
      <div style={{ padding: 24, paddingTop: 0 }}>
        <Button variant="primary" size="sm" style={{ width: "100%" }} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
