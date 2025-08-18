import { query, SDKMessage } from "@anthropic-ai/claude-code";

const printMessage = (message: SDKMessage) => {
  switch(message.type) {
    case "user":
      // Extract the actual message content from user messages
      if (message.message?.content) {
        const content = message.message.content;
        if (Array.isArray(content) && content[0]?.content) {
          // Tool result - show summary
          const toolResult = content[0].content;
          console.log(`📥 Tool result: ${toolResult.substring(0, 100)}...`);
        } else {
          console.log("👤 User:", content);
        }
      }
      break;
    
    case "assistant":
      // Extract the actual message content from assistant messages
      if (message.message?.content) {
        const content = message.message.content;
        if (Array.isArray(content)) {
          content.forEach(item => {
            if (item.type === 'text') {
              console.log("🤖 Assistant:", item.text);
            } else if (item.type === 'tool_use') {
              console.log(`🔧 Using tool: ${item.name}`);
              if (item.input) {
                const params = typeof item.input === 'object' ? 
                  Object.keys(item.input).join(', ') : 
                  item.input;
                console.log(`   Parameters: ${params}`);
              }
            }
          });
        } else {
          console.log("🤖 Assistant:", content);
        }
      }
      break;
    
    case "result":
      if (message.subtype === "success") {
        console.log("\n✅ Task completed successfully!");
        if (message.result) {
          console.log("📝 Result:", message.result);
        }
      } else {
        console.error("❌ Error:", message.subtype);
      }
      break;
    
    case "system":
      // Skip system messages for cleaner output
      break;
  }
}

// Get target framework from command line argument or environment variable
const targetFramework = process.argv[2] || process.env.TARGET_FRAMEWORK || 'svelte';

console.log(`🎯 Target Framework: ${targetFramework}`);
console.log("=".repeat(50));

async function migrateToFramework() {
  // Group 1: Framework Research & Documentation
  console.log("\n📚 GROUP 1: Framework Research & Documentation");
  console.log("-".repeat(40));
  
  // Agent 1.1: Research target framework documentation
  console.log("\n🔍 Agent 1.1: Researching ${targetFramework} documentation...");
  for await (const message of query({
    prompt: `Read the official documentation of ${targetFramework} framework, identify the most recent techniques and best practices, and dump your findings into a framework-notes.md file. Focus on:
    - Project structure and conventions
    - Component syntax and lifecycle
    - State management approaches
    - Routing patterns
    - Build configuration
    - TypeScript integration`,
    options: {
      maxTurns: 15,
      allowedTools: ["WebFetch", "WebSearch", "Write", "Read"],
      model: "claude-sonnet-4-20250514"
    }
  })) {
    printMessage(message);
  }
  
  // Agent 1.2: Research Portable-Text integration
  console.log("\n🔍 Agent 1.2: Researching Portable-Text integration...");
  for await (const message of query({
    prompt: `Research and examine https://github.com/kontent-ai/rich-text-resolver-js to understand how to work with rich text in ${targetFramework}. Also check https://github.com/orgs/portabletext/repositories for available framework adapters. Create a portable-text-transition.md file with:
    - Available adapters for ${targetFramework}
    - Implementation patterns
    - Required package changes
    - Migration strategy for existing Portable-Text usage`,
    options: {
      maxTurns: 10,
      allowedTools: ["WebFetch", "Write", "Read"],
      model: "claude-sonnet-4-20250514"
    }
  })) {
    printMessage(message);
  }
  
  // Group 2: Analysis & Planning
  console.log("\n📊 GROUP 2: Analysis & Planning");
  console.log("-".repeat(40));
  
  // Agent 2.1: Analyze current framework
  console.log("\n🔍 Agent 2.1: Analyzing current framework...");
  for await (const message of query({
    prompt: `Identify what framework is currently used in this repository. Examine:
    - package.json for framework dependencies
    - Component file extensions and syntax
    - Build configuration files
    - Project structure
    Report the current framework and its version.`,
    options: {
      maxTurns: 8,
      allowedTools: ["Read", "Glob", "Grep", "LS"],
      model: "claude-sonnet-4-20250514"
    }
  })) {
    printMessage(message);
  }
  
  // Agent 2.2: Create transition plan
  console.log("\n📝 Agent 2.2: Creating transition plan...");
  for await (const message of query({
    prompt: `Create a detailed transition-plan.md file for converting the application from the current framework to ${targetFramework}. Use the information from framework-notes.md and portable-text-transition.md. The plan should include:
    - Step-by-step migration strategy
    - Component conversion mapping
    - File structure changes needed
    - Package dependencies to add/remove
    - Configuration file updates
    - Potential challenges and solutions`,
    options: {
      maxTurns: 10,
      allowedTools: ["Read", "Write", "Glob"],
      model: "claude-sonnet-4-20250514"
    }
  })) {
    printMessage(message);
  }
  
  // Group 3: Setup & Dependencies
  console.log("\n⚙️ GROUP 3: Setup & Dependencies");
  console.log("-".repeat(40));
  
  // Agent 3.1: Install framework packages
  console.log("\n📦 Agent 3.1: Installing ${targetFramework} packages...");
  for await (const message of query({
    prompt: `Install the necessary packages for ${targetFramework} using npm. Refer to the framework-notes.md and transition-plan.md to determine the correct dependencies. This includes:
    - Core framework packages
    - TypeScript support if needed
    - Build tools and dev dependencies
    - Portable-Text adapter for ${targetFramework}
    Update package.json with proper scripts for the new framework.`,
    options: {
      maxTurns: 10,
      allowedTools: ["Bash", "Read", "Edit", "Bash(npm install)", "Bash(npm uninstall)"],
      model: "claude-sonnet-4-20250514",
    }
  })) {
    printMessage(message);
  }
  
  // Group 4: Migration Execution
  console.log("\n🔄 GROUP 4: Migration Execution");
  console.log("-".repeat(40));
  
  // Agent 4.1: Migrate components
  console.log("\n🔧 Agent 4.1: Migrating components...");
  for await (const message of query({
    prompt: `Using the knowledge from transition-plan.md, migrate all files in the components directory to ${targetFramework} syntax and conventions. Preserve:
    - All functionality
    - TypeScript types
    - Props and state management
    - Event handlers
    - Styling (do not modify CSS)
    Convert each component systematically following ${targetFramework} best practices.`,
    options: {
      maxTurns: 20,
      allowedTools: ["Read", "MultiEdit", "Write", "Glob", "LS"],
      model: "claude-sonnet-4-20250514",
      permissionMode: "acceptEdits"
    }
  })) {
    printMessage(message);
  }
  
  // Agent 4.2: Migrate pages
  console.log("\n🔧 Agent 4.2: Migrating pages...");
  for await (const message of query({
    prompt: `Migrate all files in the pages/routes directory to ${targetFramework} conventions. This includes:
    - Converting routing structure to ${targetFramework} patterns
    - Updating imports to use migrated components
    - Adapting data fetching patterns
    - Preserving all page functionality
    Follow the patterns established in the migrated components.`,
    options: {
      maxTurns: 20,
      allowedTools: ["Read", "MultiEdit", "Write", "Glob", "LS"],
      model: "claude-sonnet-4-20250514",
      permissionMode: "acceptEdits"
    }
  })) {
    printMessage(message);
  }
  
  // Agent 4.3: Update configuration files
  console.log("\n🔧 Agent 4.3: Updating configuration files...");
  for await (const message of query({
    prompt: `Update all configuration files for ${targetFramework}:
    - Create/update framework-specific config files
    - Update tsconfig.json for ${targetFramework} requirements
    - Update build configuration
    - Update any bundler configurations
    - Ensure all paths and aliases are correctly configured`,
    options: {
      maxTurns: 15,
      allowedTools: ["Read", "Edit", "Write"],
      model: "claude-sonnet-4-20250514",
      permissionMode: "acceptEdits"
    }
  })) {
    printMessage(message);
  }
  
  // Group 5: Documentation & Testing
  console.log("\n📖 GROUP 5: Documentation & Testing");
  console.log("-".repeat(40));
  
  // Agent 5.1: Update README
  console.log("\n📝 Agent 5.1: Updating README...");
  for await (const message of query({
    prompt: `Add instructions to the README file on how to start the migrated application with ${targetFramework}. Include:
    - Required setup steps
    - Development server command
    - Build command
    - Any framework-specific notes
    - Updated project description mentioning ${targetFramework}`,
    options: {
      maxTurns: 8,
      allowedTools: ["Read", "Edit"],
      model: "claude-sonnet-4-20250514"
    }
  })) {
    printMessage(message);
  }
  
  // Agent 5.2: Run visual tests
  console.log("\n🧪 Agent 5.2: Running visual tests...");
  for await (const message of query({
    prompt: `Test the migrated application end-to-end using Playwright with the command 'npm run test:visual' using only Chromium. CRITICAL: DO NOT UPDATE SCREENSHOTS. Just run the tests and report results.`,
    options: {
      maxTurns: 5,
      allowedTools: ["Bash"],
      model: "claude-sonnet-4-20250514"
    }
  })) {
    printMessage(message);
  }
  
  // Group 6: Cleanup
  console.log("\n🧹 GROUP 6: Cleanup");
  console.log("-".repeat(40));
  
  // Agent 6.1: Remove old framework traces
  console.log("\n🗑️ Agent 6.1: Removing old framework traces...");
  for await (const message of query({
    prompt: `CRITICAL: Remove all legacy components and pages from the old framework, and uninstall its related packages from the project dependencies. This includes:
    - Deleting old framework-specific files
    - Uninstalling old framework packages from package.json
    - Removing old configuration files
    - Cleaning up any framework-specific directories
    - Ensuring there are NO traces of the previous framework
    The repository should only contain ${targetFramework} code.`,
    options: {
      maxTurns: 15,
      allowedTools: ["Bash", "Glob", "Read", "Edit", "LS", "Bash(npm uninstall)"],
      model: "claude-sonnet-4-20250514"
    }
  })) {
    printMessage(message);
  }
  
  console.log("\n" + "=".repeat(50));
  console.log(`🎉 Migration to ${targetFramework} completed!`);
  console.log("=".repeat(50));
}

// Run the migration
migrateToFramework().catch(error => {
  console.error("\n❌ Migration failed:", error);
  process.exit(1);
});

export {};