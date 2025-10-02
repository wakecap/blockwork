import { TopNavigator } from "./TopNavigator";
import { projectsData } from "./projectsData";
import { menu, settingsMenu, avatarMenu } from "./menuData";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TopNavigator> = {
  title: "Navigation/TopNavigator",
  component: TopNavigator,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#111" },
        { name: "light", value: "#fff" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopNavigator>;

export const Default: Story = {
  render: () => (
    <TopNavigator
      projectsData={projectsData}
      menu={menu}
      settingsMenu={settingsMenu}
      avatarMenu={avatarMenu}
      onProjectSelect={(project) => console.log("Project selected:", project)}
      onMenuItemClick={(item) => console.log("Menu item clicked:", item)}
      onSettingsMenuItemClick={(item) => console.log("Settings item clicked:", item)}
      onAvatarMenuItemClick={(item) => console.log("Avatar menu item clicked:", item)}
    />
  ),
};

export const WithPageContent: Story = {
  render: () => (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <TopNavigator
        projectsData={projectsData}
        menu={menu}
        settingsMenu={settingsMenu}
        avatarMenu={avatarMenu}
        onProjectSelect={(project) => console.log("Project selected:", project)}
        onMenuItemClick={(item) => console.log("Menu item clicked:", item)}
        onSettingsMenuItemClick={(item) => console.log("Settings item clicked:", item)}
        onAvatarMenuItemClick={(item) => console.log("Avatar menu item clicked:", item)}
      />
      <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#333" }}>
          Welcome to Wakecap Dashboard
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem", lineHeight: "1.6" }}>
          This is a sample page to demonstrate the blur effect when the MegaMenu is opened. Click
          the grid icon in the top navigation to see the background blur effect.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Site Management</h3>
            <p style={{ color: "#666" }}>
              Manage your construction sites and workforce efficiently.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Analytics</h3>
            <p style={{ color: "#666" }}>
              View detailed reports and insights about your operations.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Team Collaboration</h3>
            <p style={{ color: "#666" }}>Connect with your team and manage projects together.</p>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#333", marginBottom: "15px" }}>Recent Activity</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ padding: "10px", background: "#f8f9fa", borderRadius: "4px" }}>
              <strong>Site Update:</strong> Construction progress at Site A - 75% complete
            </div>
            <div style={{ padding: "10px", background: "#f8f9fa", borderRadius: "4px" }}>
              <strong>New Report:</strong> Weekly safety report generated
            </div>
            <div style={{ padding: "10px", background: "#f8f9fa", borderRadius: "4px" }}>
              <strong>Team Message:</strong> John Doe shared a new document
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TopNavigator with sample page content to demonstrate the blur effect when MegaMenu is opened. Click the grid icon to see the background blur.",
      },
    },
  },
};

export const WithIdBasedCallbacks: Story = {
  render: () => (
    <TopNavigator
      projectsData={projectsData}
      menu={menu}
      settingsMenu={settingsMenu}
      avatarMenu={avatarMenu}
      onProjectSelect={(project) => {
        console.log("Project selected:", project.id, project.name);
        alert(`Selected project: ${project.name} (ID: ${project.id})`);
      }}
      onMenuItemClick={(item) => {
        console.log("Menu item clicked:", item.id, item.label);
        alert(`Menu item clicked: ${item.label} (ID: ${item.id})`);
      }}
      onSettingsMenuItemClick={(item) => {
        console.log("Settings item clicked:", item.id, item.label);
        alert(`Settings item clicked: ${item.label} (ID: ${item.id})`);
      }}
      onAvatarMenuItemClick={(item) => {
        console.log("Avatar menu item clicked:", item.id, item.label);
        alert(`Avatar menu item clicked: ${item.label} (ID: ${item.id})`);
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TopNavigator with id-based callbacks that demonstrate how to handle different menu items based on their unique IDs. Check the browser console and alerts to see the id-based functionality.",
      },
    },
  },
};

export const WithSelectedStates: Story = {
  render: () => (
    <TopNavigator
      projectsData={projectsData}
      menu={menu}
      settingsMenu={settingsMenu}
      avatarMenu={avatarMenu}
      selectedProject="proj-2"
      selectedMenuItem="reports"
      onProjectSelect={(project) => {
        console.log("Project selected:", project.id, project.name);
      }}
      onMenuItemClick={(item) => {
        console.log("Menu item clicked:", item.id, item.label);
      }}
      onSettingsMenuItemClick={(item) => {
        console.log("Settings item clicked:", item.id, item.label);
      }}
      onAvatarMenuItemClick={(item) => {
        console.log("Avatar menu item clicked:", item.id, item.label);
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TopNavigator with pre-selected project and menu item to demonstrate active/selected styling. The 'Building Project Beta' project and 'Reports' menu item are shown as selected with different styling.",
      },
    },
  },
};

export const WithSelectedSettings: Story = {
  render: () => (
    <TopNavigator
      projectsData={projectsData}
      menu={menu}
      settingsMenu={settingsMenu}
      avatarMenu={avatarMenu}
      selectedProject="proj-3"
      selectedMenuItem="data-lookups"
      onProjectSelect={(project) => {
        console.log("Project selected:", project.id, project.name);
      }}
      onMenuItemClick={(item) => {
        console.log("Menu item clicked:", item.id, item.label);
      }}
      onSettingsMenuItemClick={(item) => {
        console.log("Settings item clicked:", item.id, item.label);
      }}
      onAvatarMenuItemClick={(item) => {
        console.log("Avatar menu item clicked:", item.id, item.label);
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TopNavigator with pre-selected project and settings menu item to demonstrate active/selected styling. The 'Infrastructure Gamma' project and 'Data & Lookups' settings item are shown as selected with different styling.",
      },
    },
  },
};

export const WithInitialPinnedItems: Story = {
  render: () => (
    <TopNavigator
      projectsData={projectsData}
      menu={menu}
      settingsMenu={settingsMenu}
      avatarMenu={avatarMenu}
      initialPinnedItems={["site-map", "workforce", "crew", "reports"]}
      onProjectSelect={(project) => {
        console.log("Project selected:", project.id, project.name);
      }}
      onMenuItemClick={(item) => {
        console.log("Menu item clicked:", item.id, item.label);
      }}
      onSettingsMenuItemClick={(item) => {
        console.log("Settings item clicked:", item.id, item.label);
      }}
      onAvatarMenuItemClick={(item) => {
        console.log("Avatar menu item clicked:", item.id, item.label);
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TopNavigator with pre-pinned items to demonstrate the initialPinnedItems prop. Site Map, Workforce, Crew, and Reports are pre-pinned and visible in the navigation bar.",
      },
    },
  },
};

export const WithPinnedItemsCallback: Story = {
  render: () => (
    <TopNavigator
      projectsData={projectsData}
      menu={menu}
      settingsMenu={settingsMenu}
      avatarMenu={avatarMenu}
      initialPinnedItems={["site-map", "workforce"]}
      onPinnedItemsChange={(pinnedIds) => {
        console.log("Pinned items changed:", pinnedIds);
        alert(`Pinned items: ${pinnedIds.join(", ")}`);
      }}
      onProjectSelect={(project) => {
        console.log("Project selected:", project.id, project.name);
      }}
      onMenuItemClick={(item) => {
        console.log("Menu item clicked:", item.id, item.label);
      }}
      onSettingsMenuItemClick={(item) => {
        console.log("Settings item clicked:", item.id, item.label);
      }}
      onAvatarMenuItemClick={(item) => {
        console.log("Avatar menu item clicked:", item.id, item.label);
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TopNavigator with pinned items callback to demonstrate the onPinnedItemsChange prop. Click the grid icon to pin/unpin items and see the callback in action. Check the browser console and alerts to see the pinned items change.",
      },
    },
  },
};
