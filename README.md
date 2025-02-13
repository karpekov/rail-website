# RAIL Lab Website

This repository contains the source code for the RAIL Lab website at Georgia Tech.

If you want to make changes to the website, you need to be added to the website GitHub repository. Once you have access, you can clone the repository and make changes to the website content. Below are the instructions on how to do this.

# Getting Started

## Cloning the Repository

Clone the repository to your local machine and navigate to the project directory:

``` bash
git clone https://github.com/karpekov/rail-website.git
cd rail-website
```

## Setting Up Development Environment

You need to have Node.js installed on your machine. If you don't have it, you can install it using nvm (Node Version Manager).

0. If you don't have it, install nvm from: https://github.com/nvm-sh/nvm#installing-and-updating
1. Install Node.js 20.x (LTS version):
   - Using nvm (recommended):
     ```bash
     nvm install 20
     nvm use 20
     ```
   - Or download directly from: https://nodejs.org/

2. Install dependencies from within the project directory:
   ```bash
   npm install
   ```
   This will install all required packages specified in package.json.

## Editing Content in .yaml files

Most of the website content is stored in YAML files in the `src/data` and `static/images` folders. See below how to add or edit content in the corresponding YAML files:

### people.yaml
Contains information about current and past lab members.

**To add yourself:**
  1. Add your photo to `static/images/people/`
     - Use a square photo with your face centered (like a passport photo)
  2. Add your entry to `src/data/people.yaml` under the appropriate section
  3. Required fields: name, status, degree, degree_detail, photo
  4. Optional fields: website, linkedin, scholar, github, twitter

### projects.yaml
Contains past research projects.

**To add a project:**
  1. Add a representative image to `static/images/projects/`
     - Could be Figure 1 from your paper or a key result
     - Recommended aspect ratio: 16:9
  2. Add your project entry to `src/data/projects.yaml`
  3. Required fields: full_title, short_title, venue, image, team, tags
  4. Optional fields: website, pdf, github, video

### news.yaml
Contains lab news and announcements.Add entries in reverse chronological order.

### fun.yaml
Contains information about lab activities and outreach. Include high-quality images in `static/images/fun/`.

## Editing Content Directly on the Website

If you want to edit fields such as the website header or "About Us" section, you can do so by editing the corresponding Svelte components in the `src/components` folder.

## Testing Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`
   - The site will automatically reload when you make changes
   - Check the terminal for any error messages

## Deploying

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

2. Push to the main branch:
   ```bash
   git push origin main
   ```

3. The website will automatically deploy through Vercel
   - The live site will update within a few minutes

# Need Help?

If you run into any issues:
1. Check the error messages in your terminal
2. Make sure your Node.js version is correct (`node -v` should show v20.x.x)
3. Try deleting the `node_modules` folder and running `npm install` again
4. Contact the website maintainers for help