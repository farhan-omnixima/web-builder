# Web Builder - Wolfdevs

## Introduction
This is a Web Builder and Content Management (WBCM) platform that allows users to create their own single page websites for any kind of product promotion or e-commerce platform. It is built on top of the [Platforms Starter Kit](https://app.vercel.pub/) by Vercel. 

Also It is used the [Puck Editor](https://puckeditor.com/) for the Web Builder Editor.


## Features
- **Web Builder**: Users can create their own single page websites using the drag and drop editor.
- **Content Management**: Users can manage their website content using the Content Management System.
- **Authentication**: Users can sign up and login to the platform.
- **Custom Domains**: Users can map their own custom domains to their websites.
- **Billing**: Users can subscribe to a plan and pay for it using Stripe.
- **SEO**: Users can set SEO meta tags for their websites.
- **Analytics**: Users can view analytics for their websites.
- **Support**: Users can contact support for any issues.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS, Puck Editor
- **Backend**: Next.js API Routes, Drizzle ORM, Drizzle Kit 
- **Database**:  Turso Sqlite DB (libsql)
- **Storage**: Vercel Blob Storage
- **Authentication**: Lucia Auth
- **Billing**: Stripe
- **Analytics**: Tremor
- **Deployment**: Cloudfare



<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://images.ctfassets.net/e5382hct74si/k7XpXIE0rDsHCAYvkKhff/ff44c07588068d8fefa334cd6a318c8a/CleanShot_2023-07-05_at_08.39.02.png">
    <source media="(prefers-color-scheme: light)" srcset="https://images.ctfassets.net/e5382hct74si/7tiAitb8kdgUGktycr540c/d33f2834f9356bce25e0721c4ebe4f9a/CleanShot_2023-07-05_at_08.39.10.png">
    <img alt="Demo" src="https://images.ctfassets.net/e5382hct74si/7tiAitb8kdgUGktycr540c/d33f2834f9356bce25e0721c4ebe4f9a/CleanShot_2023-07-05_at_08.39.10.png">
</picture>

## Deploy Your Own

Deploy your own version of this starter kit with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?demo-title=Platforms+Starter+Kit&demo-description=A+template+for+site+builders+and+low-code+tools.&demo-url=https%3A%2F%2Fdemo.vercel.pub%2F&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F40JwjdHlPr0Z575MPYbxUA%2Fd5903afc68cb34569a3886293414c37c%2FOG_Image.png&project-name=Platforms+Starter+Kit&repository-name=platforms-starter-kit&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fplatforms&from=templates&env=NEXT_PUBLIC_ROOT_DOMAIN%2CNEXTAUTH_SECRET%2CAUTH_GITHUB_ID%2CAUTH_GITHUB_SECRET%2CAUTH_BEARER_TOKEN%2CPROJECT_ID_VERCEL%2CTEAM_ID_VERCEL%2COPENAI_API_KEY&envDescription=These+environment+variables+are+required+to+run+this+application.&envLink=https%3A%2F%2Fgithub.com%2Fvercel%2Fplatforms%2Fblob%2Fmain%2F.env.example&stores=%5B%7B%22type%22%3A%22postgres%22%7D%5D)

You can also [read the guide](https://vercel.com/guides/nextjs-multi-tenant-application) to learn how to develop your own version of this template.

## What is a multi-tenant application?

Multi-tenant applications serve multiple customers across different subdomains/custom domains with a single unified codebase.

For example, our demo is a multi-tenant application:

- Subdomain: [demo.vercel.pub](http://demo.vercel.pub)
- Custom domain: [platformize.co](http://platformize.co) (maps to [demo.vercel.pub](http://demo.vercel.pub))
- Build your own: [app.vercel.pub](http://app.vercel.pub)

Another example is [Hashnode](https://vercel.com/customers/hashnode), a popular blogging platform. Each writer has their own unique `.hashnode.dev` subdomain for their blog:

- [eda.hashnode.dev](https://eda.hashnode.dev/)
- [katycodesstuff.hashnode.dev](https://katycodesstuff.hashnode.dev/)
- [akoskm.hashnode.dev](https://akoskm.hashnode.dev/)

Users can also map custom domains to their `.hashnode.dev` subdomain:

- [akoskm.com](https://akoskm.com/) → [akoskm.hashnode.dev](https://akoskm.hashnode.dev/)

With the Platforms Starter Kit, you can offer unlimited custom domains at no extra cost to your customers as a premium feature, without having to worry about custom nameservers or configuring SSL certificates.

## Use Cases

- Content creation platforms
  * [Hashnode](https://hashnode.com)
  * [Mintlify](https://mintlify.com/)
  * [Read.cv](https://read.cv/)

- Website & e-commerce store builders
- B2B2C platforms

## Author & Developer

- Md. Farhan Masud Shohag (Next.js Developer, Omnixima) [Github](https://github.com/fms-byte)

## License

The MIT License. See [LICENSE]() for more information.
"Button Group": {
      fields: {
        children: {
          type: "text",
          label: "Button Text",
        },
        backgroundColor: {
          type: "text",
          label: "Background Color (#hex)",
        },
        size: {
          type: "select",
          label: "Size",
          options: [
            { value: "px-2 py-1", label: "Small" },
            { value: "px-4 py-2", label: "Medium" },
            { value: "px-6 py-3", label: "Large" },
            { value: "px-8 py-4", label: "Extra Large" },
            { value: "px-10 py-5", label: "2x Large" },
            { value: "px-12 py-6", label: "3x Large" },
          ],
        },
        textColor: {
          type: "text",
          label: "Text Color (#hex)",
        },
        borderRadius: {
          type: "select",
          label: "Border Radius",
          options: [
            { value: "rounded-none", label: "None" },
            { value: "rounded-sm", label: "Small" },
            { value: "rounded-md", label: "Medium" },
            { value: "rounded-lg", label: "Large" },
            { value: "rounded-full", label: "Full" },
          ],
        },
        alignment: {
          type: "radio",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
      },
      defaultProps: {
        children: "Button",
        backgroundColor: "#000000",
        size: "px-4 py-2",
        textColor: "#ffffff",
        borderRadius: "rounded-md",
        alignment: "left",
      },
      render: ({
        children,
        backgroundColor,
        size,
        textColor,
        borderRadius,
        alignment,
      }: {
        children: string;
        backgroundColor: string;
        size: string;
        textColor: string;
        borderRadius: string;
        alignment: string;
      }) => {
        const buttonStyle = {
          backgroundColor: backgroundColor,
          color: textColor,
        };
        const containerClassName = `flex ${alignment === "center" ? "justify-center" : alignment === "right" ? "justify-end" : "justify-start"}`;
        const buttonClassName = `${size} ${borderRadius}`;

        return (
          <div className={containerClassName}>
            <button className={buttonClassName} style={buttonStyle}>
              {children}
            </button>
          </div>
        );
      },
    },