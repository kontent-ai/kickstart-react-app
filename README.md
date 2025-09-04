# Kontent.ai Kickstart Sample React App with GraphQL

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Discord][discord-shield]][discord-url]

This repository contains the solution for the Kontent.ai Kickstart Sample React App using GraphQL. It demonstrates how to fetch content from Kontent.ai using the GraphQL API, providing type-safe queries and efficient data fetching.

If you'd like to explore a fully set up Kontent.ai project, you can import content from one of the backups located in the `./scripts/backups` folder.

```bash
npm run model:import --filename="<path-to-the-script>"
```

## Contributing

### How to Contribute

- **Report Issues**: Use the [GitHub Issues](https://github.com/kontent-ai/kickstart-react-app/issues) to report bugs or request features.
- **Fork the Repository**: Create a personal fork of the repository on GitHub.
- **Create a Feature Branch**: Use a descriptive name for your branch.
- **Submit a Pull Request**: Submit your changes for review.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

### Code of Conduct

This project adheres to a [Code of Conduct](https://github.com/kontent-ai/.github/blob/main/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### Getting Started with Development

- Run `npm ci` to install packages.
- Create a `.env` file from `.env.template` and fill out all necessary variables.
- Run `npm run codegen` to generate TypeScript types from the GraphQL schema.
- Run `npm run dev` to run the application in developer mode.

> [!IMPORTANT]
> Always run `npm run codegen` after modifying GraphQL queries to regenerate TypeScript types.

### Regenerating GraphQL Types
After updating GraphQL queries in your components or when the Kontent.ai schema changes, you must regenerate the TypeScript types:

```bash
npm run codegen
```

This command uses [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) to:
- Connect to your Kontent.ai GraphQL endpoint
- Generate TypeScript types in the `src/graphql/` directory
- Ensure type safety for all GraphQL operations

> [!NOTE]
> Ensure that the `.env` file contains:
> - `VITE_ENVIRONMENT_ID` (required) - Your Kontent.ai environment ID
> - `VITE_DELIVERY_API_KEY` (optional) - When provided, uses the preview GraphQL endpoint; otherwise uses production

### GraphQL Development Workflow

This application uses GraphQL for all data fetching from Kontent.ai:

1. **Writing Queries**: GraphQL queries are embedded directly in component files using the `graphql` tag
2. **Type Generation**: After modifying any GraphQL query, run `npm run codegen` to update TypeScript types
3. **Generated Files**: All generated types and helpers are located in `src/graphql/` - do not manually edit these files
4. **Endpoint Selection**: The GraphQL endpoint is automatically determined:
   - With `VITE_DELIVERY_API_KEY`: Uses preview endpoint for draft content
   - Without API key: Uses production endpoint for published content only


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

---

## Support

If you have any questions or need assistance, please reach out:

- **Kontent.ai Support**: [Contact Support](https://kontent.ai/support/)

---

## Additional Resources

- **Kontent.ai Official Documentation**: [Learn more about Kontent.ai](https://kontent.ai/learn/)
- **Kontent.ai GraphQL API**: [GraphQL API Documentation](https://kontent.ai/learn/docs/apis/graphql-api)
- **GraphQL Code Generator**: [Documentation and Configuration](https://the-guild.dev/graphql/codegen)

---

[contributors-shield]: https://img.shields.io/github/contributors/kontent-ai/kickstart-react-app?style=for-the-badge
[contributors-url]: https://github.com/kontent-ai/kickstart-react-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kontent-ai/kickstart-react-app.svg?style=for-the-badge
[forks-url]: https://github.com/kontent-ai/kickstart-react-app/network/members
[stars-shield]: https://img.shields.io/github/stars/kontent-ai/kickstart-react-app.svg?style=for-the-badge
[stars-url]: https://github.com/kontent-ai/kickstart-react-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/kontent-ai/kickstart-react-app.svg?style=for-the-badge
[issues-url]: https://github.com/kontent-ai/kickstart-react-app/issues
[license-shield]: https://img.shields.io/github/license/kontent-ai/kickstart-react-app.svg?style=for-the-badge
[license-url]: https://github.com/kontent-ai/kickstart-react-app/blob/master/LICENSE.md
[discord-shield]: https://img.shields.io/discord/821885171984891914?color=%237289DA&label=Kontent.ai%20Discord&logo=discord&style=for-the-badge
[discord-url]: https://discord.com/invite/SKCxwPtevJ

