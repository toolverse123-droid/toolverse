import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type Language = 'en' | 'ko' | 'zh' | 'ar';

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

const getInitialLanguage = (): Language => {
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0];
      if (LANGUAGES.some(lang => lang.code === browserLang)) {
        return browserLang as Language;
      }
    }
    return 'en';
};

const translations = {
  en: {
    toolverse: 'ToolVerse',
    viewOnGithub: 'View on GitHub',
    tools: {
      Summarizer: 'Text Summarizer',
      ImageGenerator: 'Image Generator',
      JsonFormatter: 'JSON Formatter',
      ColorConverter: 'Color Converter',
      PasswordGenerator: 'Password Generator',
      BmiCalculator: 'BMI Calculator',
      ExchangeRateCalculator: 'Exchange Rate Calculator',
      PercentageCalculator: 'Percentage Calculator',
      AgeCalculator: 'Age Calculator',
      BarcodeGenerator: 'Barcode Generator',
      QrCodeGenerator: 'QR Code Generator',
      NicknameGenerator: 'Nickname Generator',
      MealPicker: 'Meal Picker',
      DdayCalculator: 'D-Day Calculator',
      CagrCalculator: 'CAGR Calculator',
      UnitConverter: 'Unit Converter',
      LoanCalculator: 'Loan Calculator',
      About: 'About Us',
      TermsOfService: 'Terms of Service',
      PrivacyPolicy: 'Privacy Policy',
    },
    summarizer: {
      label: 'Enter Text to Summarize',
      placeholder: 'Paste your long text here...',
      button: 'Summarize Text',
      loading: 'Summarizing...',
      error: 'Failed to generate summary. Please try again.',
      errorInput: 'Please enter some text to summarize.',
      summaryTitle: 'Summary',
      summaryPlaceholder: 'Generating summary...',
      apiPrompt: 'Summarize the following text concisely:',
      apiSystemInstruction: 'You are an expert at summarizing long texts into short, easy-to-understand paragraphs. Always respond in English.',
      apiKeyMissing: 'The Summarizer service is not configured. Gemini API key is missing.',
      description: `
        <h3>About the Text Summarizer</h3>
        <p>The Text Summarizer uses advanced AI (Google's Gemini model) to condense long articles, papers, or documents into a short, easy-to-read summary. It saves you time by extracting the key points from a large body of text.</p>
        <h3>How to Use</h3>
        <ol>
          <li>Copy the text you want to summarize.</li>
          <li>Paste it into the text area above.</li>
          <li>Click the "Summarize Text" button.</li>
          <li>The concise summary will appear in the box below.</li>
        </ol>
        <h3>Advantages</h3>
        <ul>
          <li><strong>Time-Saving:</strong> Quickly grasp the main ideas of long texts without reading them entirely.</li>
          <li><strong>Efficient:</strong> Ideal for students, researchers, and professionals who need to process large amounts of information.</li>
          <li><strong>AI-Powered:</strong> Leverages a powerful language model for high-quality, coherent summaries.</li>
        </ul>
      `
    },
    imageGenerator: {
      label: 'Enter Image Prompt',
      placeholder: 'e.g., A futuristic cityscape at sunset, neon lights',
      button: 'Generate Image',
      loading: 'Generating...',
      error: 'Failed to generate image. Please try again.',
      errorInput: 'Please enter a prompt to generate an image.',
      imagePlaceholder: 'Creating your image...',
      imageDefault: 'Your generated image will appear here.',
      apiKeyMissing: 'The Image Generator service is not configured. Gemini API key is missing.',
      description: `
        <h3>About the Image Generator</h3>
        <p>Unleash your creativity with the AI Image Generator. Powered by Google's Imagen model, this tool transforms your text descriptions into unique, high-quality images. Just describe what you want to see, and the AI will bring it to life.</p>
        <h3>How to Use</h3>
        <ol>
          <li>Type a descriptive prompt into the input field (e.g., "a majestic lion wearing a crown in a fantasy forest").</li>
          <li>Click the "Generate Image" button.</li>
          <li>Wait a few moments for the AI to process your request.</li>
          <li>The generated image will be displayed in the preview area.</li>
        </ol>
        <h3>Advantages</h3>
        <ul>
          <li><strong>Creative Freedom:</strong> Create any image you can imagine, from realistic portraits to surreal landscapes.</li>
          <li><strong>Unique Artwork:</strong> Generate one-of-a-kind images for blogs, social media, presentations, or personal projects.</li>
          <li><strong>Easy to Use:</strong> No artistic skill required. If you can describe it, you can create it.</li>
        </ul>
      `
    },
    jsonFormatter: {
      label: 'Enter JSON Data',
      placeholder: '{ "key": "value", "nested": { "array": [1, 2, 3] } }',
      formatButton: 'Format / Validate',
      clearButton: 'Clear',
      success: 'JSON successfully formatted.',
      error: 'Formatting failed: ',
      errorInput: 'Input is empty.',
      invalidJson: 'Invalid JSON format.',
      description: `
        <h3>About the JSON Formatter</h3>
        <p>The JSON Formatter and Validator is an essential tool for developers working with JSON data. It helps you format messy JSON into a clean, human-readable structure and validates it to ensure it's free of syntax errors.</p>
        <h3>How to Use</h3>
        <ol>
          <li>Paste your raw or minified JSON data into the text area.</li>
          <li>Click the "Format / Validate" button.</li>
          <li>The tool will instantly beautify the JSON with proper indentation.</li>
          <li>A status message will confirm if the JSON is valid or specify the error if it's not.</li>
        </ol>
        <h3>Advantages</h3>
        <ul>
          <li><strong>Improved Readability:</strong> Makes complex JSON structures easy to read and understand.</li>
          <li><strong>Error Detection:</strong> Quickly find and fix syntax errors in your JSON data.</li>
          <li><strong>Client-Side Processing:</strong> Your data is processed securely in your browser and is never sent to a server.</li>
        </ul>
      `
    },
    colorConverter: {
      hex: 'HEX',
      rgb: 'RGB',
      hsl: 'HSL',
      description: `
        <h3>About the Color Converter</h3>
        <p>A handy utility for web designers and developers. This tool allows you to pick a color and instantly see its corresponding values in HEX, RGB, and HSL formats. You can also copy any of these values to your clipboard with a single click.</p>
        <h3>How to Use</h3>
        <ol>
          <li>Use the color picker to select your desired color. The preview circle will update instantly.</li>
          <li>The HEX, RGB, and HSL values will automatically update.</li>
          <li>Click the copy icon next to any value to copy it to your clipboard.</li>
        </ol>
        <h3>Advantages</h3>
        <ul>
          <li><strong>Real-time Conversion:</strong> See all color formats update instantly as you pick a color.</li>
          <li><strong>Easy & Intuitive:</strong> A simple visual interface makes color conversion effortless.</li>
          <li><strong>Quick Copy:</strong> Conveniently copy color codes for use in your CSS, design tools, or other projects.</li>
        </ul>
      `
    },
    passwordGenerator: {
      placeholder: 'Your password will appear here',
      copied: 'Copied!',
      copyTitle: 'Copy to clipboard',
      length: 'Password Length',
      uppercase: 'Include Uppercase',
      lowercase: 'Include Lowercase',
      numbers: 'Include Numbers',
      symbols: 'Include Symbols',
      regenerateButton: 'Regenerate Password',
      description: `
        <h3>About the Password Generator</h3>
        <p>Enhance your online security with the Password Generator. This tool creates strong, random passwords based on your specified criteria, making it much harder for your accounts to be compromised.</p>
        <h3>How to Use</h3>
        <ol>
          <li>Use the slider to set the desired password length (between 6 and 32 characters).</li>
          <li>Select the character types you want to include (uppercase, lowercase, numbers, symbols).</li>
          <li>A strong password is automatically generated. Click the "Regenerate" button for a new one.</li>
          <li>Click the copy icon to instantly copy the password to your clipboard.</li>
        </ol>
        <h3>Advantages</h3>
        <ul>
          <li><strong>Strong Security:</strong> Creates complex passwords that are difficult to guess or crack.</li>
          <li><strong>Customizable:</strong> Tailor the password to meet the requirements of any website or application.</li>
          <li><strong>Secure:</strong> The entire process runs in your browser; your password is never sent over the internet.</li>
        </ul>
      `
    },
    bmiCalculator: {
      metric: 'Metric',
      imperial: 'Imperial',
      weight: 'Weight',
      height: 'Height',
      yourBmi: 'Your BMI',
      underweight: 'Underweight',
      normal: 'Normal Weight',
      overweight: 'Overweight',
      obese: 'Obese',
      description: `
        <h3>About the BMI Calculator</h3>
        <p>The Body Mass Index (BMI) Calculator is a simple tool to help you gauge whether your weight is in a healthy range for your height. It's a widely used indicator to identify potential weight problems.</p>
        <h3>How to Use</h3>
        <ol>
          <li>Select your preferred unit system (Metric or Imperial).</li>
          <li>Enter your weight and height in the corresponding fields.</li>
          <li>Your BMI score and weight category will be calculated and displayed instantly.</li>
        </ol>
        <h3>Advantages</h3>
        <ul>
          <li><strong>Quick Health Check:</strong> Get an immediate estimate of your weight status.</li>
          <li><strong>Supports Both Units:</strong> Works with both metric (kg, cm) and imperial (lbs, ft, in) systems for your convenience.</li>
          <li><strong>Clear Results:</strong> Provides not just a number, but also a clear category like "Normal Weight" or "Overweight".</li>
        </ul>
        <p><strong>Disclaimer:</strong> This calculator is for informational purposes only. Consult a healthcare professional for a comprehensive health assessment.</p>
      `
    },
    exchangeRateCalculator: {
      amount: 'Amount',
      from: 'From',
      to: 'To',
      swap: 'Swap currencies',
      disclaimer: 'Rates are provided by a live API, are for informational purposes, and may have delays.',
      error: 'Failed to fetch exchange rates. Please try again later.',
      apiKeyMissing: 'The exchange rate service is not configured. API key is missing.',
      currencies: {
        USD: "United States Dollar",
        EUR: "Euro",
        JPY: "Japanese Yen",
        GBP: "British Pound",
        AUD: "Australian Dollar",
        CAD: "Canadian Dollar",
        CHF: "Swiss Franc",
        CNY: "Chinese Yuan",
        KRW: "South Korean Won",
      },
      description: `
        <h3>About the Exchange Rate Calculator</h3>
        <p>This tool provides real-time currency conversion based on the latest exchange rates. Whether you're planning a trip, shopping online, or managing international finances, get up-to-date conversions instantly.</p>
        <h3>How to Use</h3>
        <ol>
          <li>Enter the amount of money you want to convert.</li>
          <li>Select the currency you are converting from.</li>
          <li>Select the currency you want to convert to.</li>
          <li>The converted amount will be calculated and displayed automatically.</li>
        </ol>
        <h3>Advantages</h3>
        <ul>
          <li><strong>Live Data:</strong> Uses a real-time API to provide current exchange rates (rates may have slight delays).</li>
          <li><strong>Easy to Use:</strong> A straightforward interface for quick and simple currency conversions.</li>
          <li><strong>Debounced Input:</strong> Efficiently performs calculations after you stop typing to avoid excessive requests.</li>
        </ul>
      `
    },
    percentageCalculator: {
      title: 'What is % of a number?',
      of: 'of',
      result: 'Result',
      description: `
        <h3>About the Percentage Calculator</h3>
        <p>A simple and fast tool for performing common percentage calculations. Whether you're calculating a discount, figuring out a tip, or solving a math problem, this calculator gives you the answer instantly.</p>
        <h3>How to Use</h3>
        <ol>
          <li>Enter the percentage you want to calculate in the first box (e.g., 15 for 15%).</li>
          <li>Enter the base number you are calculating the percentage of in the second box.</li>
          <li>The result is calculated and displayed in real-time.</li>
        </ol>
        <h3>Advantages</h3>
        <ul>
          <li><strong>Quick & Easy:</strong> Solves everyday percentage problems without manual calculation.</li>
          <li><strong>Instant Results:</strong> No need to click a button; the result updates as you type.</li>
          <li><strong>Versatile:</strong> Useful for shopping, finance, cooking, and academic purposes.</li>
        </ul>
      `
    },
    ageCalculator: {
      label: 'Enter your date of birth',
      yourAge: 'You are',
      years: 'Years',
      months: 'Months',
      days: 'Days',
      description: `
        <h3>About the Age Calculator</h3>
        <p>Find out your exact age in years, months, and days with this simple tool. Just enter your date of birth, and the calculator will instantly compute your chronological age based on the current date.</p>
        <h3>How to Use</h3>
        <ol>
          <li>Click on the input field and select your date of birth from the calendar.</li>
          <li>The calculator will automatically display your precise age broken down into years, months, and days.</li>
        </ol>
        <h3>Advantages</h3>
        <ul>
          <li><strong>Precise Calculation:</strong> Provides an exact age, not just the number of years.</li>
          <li><strong>User-Friendly:</strong> Features an easy-to-use date picker for input.</li>
          <li><strong>Instantaneous:</strong> Calculates your age immediately upon selecting a date.</li>
        </ul>
      `
    },
    barcodeGenerator: {
        dataLabel: "Data to Encode",
        dataPlaceholder: "Enter text or URL",
        formatLabel: "Barcode Format",
        generateButton: "Generate",
        downloadButton: "Download",
        errorInput: "Please enter data to generate a barcode.",
        description: `
            <h3>About the Barcode Generator</h3>
            <p>Easily create various types of barcodes and QR codes for your products, events, or personal use. This tool supports popular formats like CODE128, EAN-13, and QR codes, converting your text or URL into a scannable image.</p>
            <h3>How to Use</h3>
            <ol>
                <li>Enter the data (text, numbers, or URL) you want to encode in the input field.</li>
                <li>Select the desired barcode format from the dropdown menu.</li>
                <li>Click the "Generate" button to see the barcode preview.</li>
                <li>Once generated, click the "Download" button to save the barcode as a PNG image.</li>
            </ol>
            <h3>Advantages</h3>
            <ul>
                <li><strong>Multiple Formats:</strong> Supports a wide range of common barcode standards.</li>
                <li><strong>Instant Preview:</strong> See your barcode or QR code as you create it.</li>
                <li><strong>Downloadable:</strong> Save your generated barcodes as high-quality images for printing or digital use.</li>
            </ul>
        `
    },
    qrCodeGenerator: {
        dataLabel: "Data to Encode",
        dataPlaceholder: "Enter text or URL for QR Code",
        downloadButton: "Download QR Code",
        errorInput: "Please enter data to generate a QR code.",
        description: `
            <h3>About the QR Code Generator</h3>
            <p>Quickly create a QR code from any text or URL. QR codes are a convenient way to share information like website links, contact details, or Wi-Fi credentials. This tool generates a high-quality, scannable QR code that you can download and use anywhere.</p>
            <h3>How to Use</h3>
            <ol>
                <li>Enter the text or URL you want to encode into the input field.</li>
                <li>The QR code will be generated and displayed in real-time.</li>
                <li>Click the "Download QR Code" button to save the image as a PNG file.</li>
            </ol>
            <h3>Advantages</h3>
            <ul>
                <li><strong>Instant Generation:</strong> The QR code updates as you type for immediate feedback.</li>
                <li><strong>Versatile:</strong> Encode website URLs, plain text, phone numbers, and more.</li>
                <li><strong>High-Quality Download:</strong> Save a clear, high-resolution QR code image suitable for print and digital use.</li>
            </ul>
        `
    },
    nicknameGenerator: {
        generateButton: "Generate New Nickname",
        copyButton: "Copy",
        copied: "Copied!",
        description: `
            <h3>About the Nickname Generator</h3>
            <p>Stuck on finding a creative username or nickname? This tool generates unique and fun nicknames by combining a random adjective with a noun. It's perfect for gaming, social media, or any online platform.</p>
            <h3>How to Use</h3>
            <ol>
                <li>Click the "Generate New Nickname" button.</li>
                <li>A new, random nickname will appear in the display box.</li>
                <li>Keep clicking until you find one you like.</li>
                <li>Click the "Copy" button to save it to your clipboard.</li>
            </ol>
            <h3>Advantages</h3>
            <ul>
                <li><strong>Endless Possibilities:</strong> Generates a vast number of unique combinations.</li>
                <li><strong>Simple and Fast:</strong> Get a new nickname with a single click.</li>
                <li><strong>Fun and Creative:</strong> Discover amusing and memorable nicknames you wouldn't have thought of.</li>
            </ul>
        `
    },
    mealPicker: {
        title: "What should I eat?",
        pickButton: "Recommend a Menu!",
        resultPrefix: "How about",
        resultSuffix: "for today?",
        description: `
            <h3>About the Meal Picker</h3>
            <p>Can't decide what to eat for lunch or dinner? Let the Meal Picker make the decision for you! This tool randomly suggests a delicious meal from a curated list of popular dishes, helping you overcome decision fatigue.</p>
            <h3>How to Use</h3>
            <ol>
                <li>Simply click the "Recommend a Menu!" button.</li>
                <li>The tool will randomly select and display a meal suggestion.</li>
                <li>If you don't like the suggestion, just click again for another one.</li>
            </ol>
            <h3>Advantages</h3>
            <ul>
                <li><strong>Solves Indecisiveness:</strong> A quick and fun way to decide on your next meal.</li>
                <li><strong>Discover New Ideas:</strong> Might remind you of a dish you haven't had in a while.</li>
                <li><strong>Instantaneous:</strong> No waiting, just a click and a suggestion.</li>
            </ul>
        `
    },
    ddayCalculator: {
        eventTitleLabel: "Event Title",
        eventTitlePlaceholder: "e.g., My Birthday",
        dateLabel: "Target Date",
        result: "Result",
        daysLeft: "days left",
        daysPassed: "days passed",
        today: "is Today!",
        description: `
            <h3>About the D-Day Calculator</h3>
            <p>Keep track of important upcoming events or anniversaries with the D-Day Calculator. Set a target date and see how many days are left, or calculate how many days have passed since a significant event.</p>
            <h3>How to Use</h3>
            <ol>
                <li>Enter a title for your event (e.g., "Vacation" or "Project Deadline").</li>
                <li>Select the target date from the calendar.</li>
                <li>The calculator will instantly show you the countdown (D-) or count-up (D+) in days.</li>
            </ol>
            <h3>Advantages</h3>
            <ul>
                <li><strong>Stay Organized:</strong> Never lose track of important dates like exams, holidays, or deadlines.</li>
                <li><strong>Easy Visualization:</strong> Clearly displays the number of days remaining or passed.</li>
                <li><strong>Versatile:</strong> Useful for both future events and past milestones.</li>
            </ul>
        `
    },
    cagrCalculator: {
        startValueLabel: "Starting Value",
        endValueLabel: "Ending Value",
        yearsLabel: "Number of Years",
        calculateButton: "Calculate CAGR",
        resultTitle: "Annual Growth Rate (CAGR)",
        description: `
            <h3>About the CAGR Calculator</h3>
            <p>The Compound Annual Growth Rate (CAGR) calculator is a financial tool that measures an investment's annual growth rate over a specified period. It provides a smoothed-out rate of return, assuming the investment has grown at a steady rate each year.</p>
            <h3>How to Use</h3>
            <ol>
                <li>Enter the initial value of the investment in the "Starting Value" field.</li>
                <li>Enter the final value in the "Ending Value" field.</li>
                <li>Enter the total duration of the investment in years.</li>
                <li>Click "Calculate CAGR" to see the result.</li>
            </ol>
            <h3>Advantages</h3>
            <ul>
                <li><strong>Standardized Metric:</strong> Provides a clear and widely accepted measure for comparing investment performance.</li>
                <li><strong>Simple to Use:</strong> Complex financial calculations are done for you instantly.</li>
                <li><strong>Informative:</strong> Helps in understanding the true growth of an investment over time.</li>
            </ul>
        `
    },
    unitConverter: {
        categoryLabel: "Category",
        fromLabel: "From",
        toLabel: "To",
        categories: {
            length: "Length",
            weight: "Weight",
            temperature: "Temperature",
        },
        units: {
            // Length
            m: "Meter (m)",
            km: "Kilometer (km)",
            cm: "Centimeter (cm)",
            mm: "Millimeter (mm)",
            mi: "Mile (mi)",
            yd: "Yard (yd)",
            ft: "Foot (ft)",
            in: "Inch (in)",
            // Weight
            kg: "Kilogram (kg)",
            g: "Gram (g)",
            mg: "Milligram (mg)",
            lb: "Pound (lb)",
            oz: "Ounce (oz)",
            // Temperature
            c: "Celsius (°C)",
            f: "Fahrenheit (°F)",
            k: "Kelvin (K)",
        },
        description: `
            <h3>About the Unit Converter</h3>
            <p>A versatile and essential tool for converting between various units of measurement. Whether you need to convert length, weight, or temperature, this converter provides fast and accurate results for students, professionals, and everyday use.</p>
            <h3>How to Use</h3>
            <ol>
                <li>Select the category of measurement (e.g., Length).</li>
                <li>Enter the value you wish to convert in the input field.</li>
                <li>Choose the unit you are converting from.</li>
                <li>Choose the unit you want to convert to.</li>
                <li>The converted result is displayed instantly.</li>
            </ol>
            <h3>Advantages</h3>
            <ul>
                <li><strong>Comprehensive:</strong> Covers common units for length, weight, and temperature.</li>
                <li><strong>Real-time Results:</strong> Conversions are updated automatically as you type or change units.</li>
                <li><strong>User-Friendly:</strong> A clean and intuitive interface makes conversions quick and easy.</li>
            </ul>
        `
    },
    loanCalculator: {
        amountLabel: "Loan Amount",
        rateLabel: "Annual Interest Rate (%)",
        termLabel: "Loan Term (Years)",
        calculateButton: "Calculate",
        resultsTitle: "Loan Summary",
        monthlyPayment: "Monthly Payment",
        totalInterest: "Total Interest Paid",
        totalRepayment: "Total Repayment",
        description: `
            <h3>About the Loan Calculator</h3>
            <p>This tool helps you understand the financial implications of a loan. By entering the loan amount, interest rate, and term, you can calculate your estimated monthly payments, the total interest you'll pay over the life of the loan, and the total amount you'll repay.</p>
            <h3>How to Use</h3>
            <ol>
                <li>Enter the total loan amount you wish to borrow.</li>
                <li>Input the annual interest rate for the loan.</li>
                <li>Specify the loan term in years.</li>
                <li>Click the "Calculate" button to see a detailed summary of your loan.</li>
            </ol>
            <h3>Advantages</h3>
            <ul>
                <li><strong>Financial Planning:</strong> Helps you budget effectively by knowing your monthly payment obligations.</li>
                <li><strong>Informed Decisions:</strong> Understand the true cost of a loan before committing.</li>
                <li><strong>Easy to Use:</strong> Simplifies complex loan calculations into a few simple steps.</li>
            </ul>
        `
    },
    about: {
        title: "About ToolVerse",
        content: `<h3>About ToolVerse</h3><p>ToolVerse is a versatile multilingual web toolkit designed to provide a collection of useful utilities for everyday tasks. Our goal is to offer simple, powerful, and accessible tools to a global audience.</p><h4>Our Tools</h4><p>Our current suite of tools includes:</p><ul><li><strong>Text Summarizer:</strong> Condense long articles and texts into concise summaries using AI.</li><li><strong>Image Generator:</strong> Create unique images from text descriptions.</li><li><strong>JSON Formatter:</strong> Validate and format your JSON data with ease.</li><li><strong>Color Converter:</strong> Convert colors between HEX, RGB, and HSL formats.</li><li><strong>Password Generator:</strong> Create strong, secure, and customizable passwords.</li></ul><h4>Our Technology</h4><p>Some of our advanced features, like the Text Summarizer and Image Generator, are powered by Google's Gemini API, providing state-of-the-art AI capabilities.</p><h4>Contact Us</h4><p>We welcome your feedback and suggestions! If you have any questions, comments, or concerns, please feel free to reach out to us at: <a href="mailto:toolverse123@gmail.com" class="text-cyan-400 hover:underline">toolverse123@gmail.com</a>.</p>`
    },
    termsofservice: {
        title: "Terms of Service",
        content: `<h3>Terms of Service for ToolVerse</h3><p><strong>Last Updated: 2024-05-20</strong></p><p>Welcome to ToolVerse! These terms and conditions outline the rules and regulations for the use of our website.</p><h4>1. Acceptance of Terms</h4><p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use ToolVerse if you do not agree to all of the terms and conditions stated on this page.</p><h4>2. Use of Tools</h4><p>ToolVerse provides a variety of online utilities. You agree to use these tools for their intended purposes and in a lawful manner. You are responsible for any data you input into our tools.</p><p>You must not input any sensitive personal information (e.g., social security numbers, financial information, health records) into any of the tools provided on this website.</p><h4>3. AI-Powered Tools</h4><p>Our Text Summarizer and Image Generator utilize the Google Gemini API. By using these tools, you agree that the data you provide (text or prompts) will be sent to Google for processing. You retain ownership of your original content, but you grant us and our third-party providers a license to use the content to provide the service.</p><p>The output generated by these AI tools is for informational purposes only. We do not guarantee the accuracy, completeness, or reliability of the generated content.</p><h4>4. Disclaimer of Warranties</h4><p>The services on ToolVerse are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p><h4>5. Limitation of Liability</h4><p>In no event shall ToolVerse or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ToolVerse's website.</p><h4>6. Changes to Terms</h4><p>We reserve the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms of service.</p>`
    },
    privacypolicy: {
        title: "Privacy Policy",
        content: `<h3>Privacy Policy for ToolVerse</h3><p><strong>Last Updated: 2024-05-20</strong></p><p>This Privacy Policy describes how your information is handled when you use ToolVerse.</p><h4>1. Information We Collect</h4><p>We aim to collect as little information as possible. The data you provide (e.g., text for summarization) is used solely to operate the specific tool you are using.</p><h4>2. How We Use Information</h4><ul><li><strong>AI Tools:</strong> Text and prompts are sent to the Google Gemini API for processing. We do not store your inputs or outputs. Please refer to Google's Privacy Policy for their data handling practices.</li><li><strong>Client-Side Tools:</strong> Other tools like the JSON Formatter and Password Generator operate entirely in your browser. This data is not sent to our servers.</li></ul><h4>3. Cookies</h4><p>We do not use cookies for tracking. We may use local storage to save preferences like language selection, which is stored only on your device.</p><h4>4. Third-Party Services</h4><p>Your use of features powered by the Google Gemini API is subject to Google's terms and privacy policies.</p><h4>5. Contact Us</h4><p>If you have any questions about this Privacy Policy, you can contact us at: <a href="mailto:toolverse123@gmail.com" class="text-cyan-400 hover:underline">toolverse123@gmail.com</a>.</p>`
    },
  },
  ko: {
    toolverse: '툴버스',
    viewOnGithub: 'GitHub에서 보기',
    tools: {
      Summarizer: '텍스트 요약',
      ImageGenerator: '이미지 생성',
      JsonFormatter: 'JSON 포맷터',
      ColorConverter: '색상 변환',
      PasswordGenerator: '비밀번호 생성',
      BmiCalculator: 'BMI 계산기',
      ExchangeRateCalculator: '환율 계산기',
      PercentageCalculator: '퍼센트 계산기',
      AgeCalculator: '나이 계산기',
      BarcodeGenerator: '바코드 생성기',
      QrCodeGenerator: 'QR 코드 생성기',
      NicknameGenerator: '닉네임 생성기',
      MealPicker: '메뉴 추천',
      DdayCalculator: 'D-day 계산기',
      CagrCalculator: '연평균 성장률(CAGR) 계산기',
      UnitConverter: '단위 변환기',
      LoanCalculator: '대출 계산기',
      About: '서비스 소개',
      TermsOfService: '이용약관',
      PrivacyPolicy: '개인정보처리방침',
    },
    summarizer: {
      label: '요약할 텍스트 입력',
      placeholder: '긴 텍스트를 여기에 붙여넣으세요...',
      button: '텍스트 요약',
      loading: '요약 중...',
      error: '요약 생성에 실패했습니다. 다시 시도해 주세요.',
      errorInput: '요약할 텍스트를 입력해 주세요.',
      summaryTitle: '요약',
      summaryPlaceholder: '요약 생성 중...',
      apiPrompt: '다음 텍스트를 간결하게 요약해 주세요:',
      apiSystemInstruction: '당신은 긴 텍스트를 짧고 이해하기 쉬운 단락으로 요약하는 전문가입니다. 항상 한국어로 응답해 주세요.',
      apiKeyMissing: '요약 서비스가 설정되지 않았습니다. Gemini API 키가 없습니다.',
      description: `
        <h3>텍스트 요약 도구 소개</h3>
        <p>텍스트 요약 도구는 고급 AI(Google Gemini 모델)를 사용하여 긴 기사, 논문 또는 문서를 짧고 읽기 쉬운 요약으로 압축합니다. 방대한 텍스트에서 핵심 포인트를 추출하여 시간을 절약해 줍니다.</p>
        <h3>사용 방법</h3>
        <ol>
          <li>요약하고 싶은 텍스트를 복사합니다.</li>
          <li>위의 텍스트 영역에 붙여넣습니다.</li>
          <li>"텍스트 요약" 버튼을 클릭합니다.</li>
          <li>간결한 요약이 아래 상자에 나타납니다.</li>
        </ol>
        <h3>장점</h3>
        <ul>
          <li><strong>시간 절약:</strong> 긴 글을 전부 읽지 않고도 핵심 아이디어를 빠르게 파악할 수 있습니다.</li>
          <li><strong>효율성:</strong> 많은 양의 정보를 처리해야 하는 학생, 연구원, 전문가에게 이상적입니다.</li>
          <li><strong>AI 기반:</strong> 강력한 언어 모델을 활용하여 고품질의 일관된 요약을 제공합니다.</li>
        </ul>
      `
    },
    imageGenerator: {
      label: '이미지 프롬프트 입력',
      placeholder: '예: 해질녘 미래 도시 풍경, 네온 불빛',
      button: '이미지 생성',
      loading: '생성 중...',
      error: '이미지 생성에 실패했습니다. 다시 시도해 주세요.',
      errorInput: '이미지를 생성할 프롬프트를 입력해 주세요.',
      imagePlaceholder: '이미지를 만들고 있습니다...',
      imageDefault: '생성된 이미지가 여기에 표시됩니다.',
      apiKeyMissing: '이미지 생성 서비스가 설정되지 않았습니다. Gemini API 키가 없습니다.',
      description: `
        <h3>이미지 생성 도구 소개</h3>
        <p>AI 이미지 생성기로 창의력을 발휘해 보세요. Google의 Imagen 모델로 구동되는 이 도구는 텍스트 설명을 독특하고 고품질의 이미지로 변환합니다. 보고 싶은 것을 설명하기만 하면 AI가 현실로 만들어 줍니다.</p>
        <h3>사용 방법</h3>
        <ol>
          <li>입력 필드에 설명적인 프롬프트를 입력합니다(예: "판타지 숲에서 왕관을 쓴 위엄 있는 사자").</li>
          <li>"이미지 생성" 버튼을 클릭합니다.</li>
          <li>AI가 요청을 처리할 때까지 잠시 기다립니다.</li>
          <li>생성된 이미지가 미리보기 영역에 표시됩니다.</li>
        </ol>
        <h3>장점</h3>
        <ul>
          <li><strong>창의적 자유:</strong> 사실적인 초상화부터 초현실적인 풍경까지 상상할 수 있는 모든 이미지를 만들 수 있습니다.</li>
          <li><strong>독특한 예술 작품:</strong> 블로그, 소셜 미디어, 프레젠테이션 또는 개인 프로젝트를 위한 세상에 하나뿐인 이미지를 생성합니다.</li>
          <li><strong>쉬운 사용법:</strong> 예술적 기술이 필요 없습니다. 설명할 수 있다면 만들 수 있습니다.</li>
        </ul>
      `
    },
    jsonFormatter: {
      label: 'JSON 데이터 입력',
      placeholder: '{ "key": "값", "nested": { "array": [1, 2, 3] } }',
      formatButton: '포맷 / 검증',
      clearButton: '지우기',
      success: 'JSON 포맷팅에 성공했습니다.',
      error: '포맷팅 실패: ',
      errorInput: '입력값이 비어있습니다.',
      invalidJson: '잘못된 JSON 형식입니다.',
      description: `
        <h3>JSON 포맷터 소개</h3>
        <p>JSON 포맷터 및 검증기는 JSON 데이터를 다루는 개발자에게 필수적인 도구입니다. 지저분한 JSON을 깔끔하고 사람이 읽기 쉬운 구조로 포맷하고, 구문 오류가 없는지 확인해 줍니다.</p>
        <h3>사용 방법</h3>
        <ol>
          <li>원본 또는 축소된 JSON 데이터를 텍스트 영역에 붙여넣습니다.</li>
          <li>"포맷 / 검증" 버튼을 클릭합니다.</li>
          <li>도구가 즉시 JSON을 적절한 들여쓰기로 보기 좋게 만듭니다.</li>
          <li>JSON이 유효한지 확인하거나 오류가 있는 경우 해당 오류를 명시하는 상태 메시지가 표시됩니다.</li>
        </ol>
        <h3>장점</h3>
        <ul>
          <li><strong>가독성 향상:</strong> 복잡한 JSON 구조를 쉽게 읽고 이해할 수 있게 해줍니다.</li>
          <li><strong>오류 감지:</strong> JSON 데이터의 구문 오류를 신속하게 찾아 수정할 수 있습니다.</li>
          <li><strong>클라이언트 측 처리:</strong> 데이터는 브라우저에서 안전하게 처리되며 서버로 전송되지 않습니다.</li>
        </ul>
      `
    },
    colorConverter: {
      hex: 'HEX',
      rgb: 'RGB',
      hsl: 'HSL',
      description: `
        <h3>색상 변환기 소개</h3>
        <p>웹 디자이너와 개발자를 위한 편리한 유틸리티입니다. 이 도구를 사용하면 색상을 선택하고 해당 HEX, RGB, HSL 형식 값을 즉시 확인할 수 있습니다. 클릭 한 번으로 이러한 값 중 하나를 클립보드에 복사할 수도 있습니다.</p>
        <h3>사용 방법</h3>
        <ol>
          <li>색상 선택기를 사용하여 원하는 색상을 선택합니다. 미리보기 원이 즉시 업데이트됩니다.</li>
          <li>HEX, RGB, HSL 값이 자동으로 업데이트됩니다.</li>
          <li>값 옆에 있는 복사 아이콘을 클릭하여 클립보드에 복사합니다.</li>
        </ol>
        <h3>장점</h3>
        <ul>
          <li><strong>실시간 변환:</strong> 색상을 선택하면 모든 색상 형식이 즉시 업데이트되는 것을 볼 수 있습니다.</li>
          <li><strong>쉽고 직관적:</strong> 간단한 시각적 인터페이스로 색상 변환이 간편합니다.</li>
          <li><strong>빠른 복사:</strong> CSS, 디자인 도구 또는 기타 프로젝트에서 사용할 색상 코드를 편리하게 복사할 수 있습니다.</li>
        </ul>
      `
    },
    passwordGenerator: {
      placeholder: '비밀번호가 여기에 표시됩니다',
      copied: '복사됨!',
      copyTitle: '클립보드에 복사',
      length: '비밀번호 길이',
      uppercase: '대문자 포함',
      lowercase: '소문자 포함',
      numbers: '숫자 포함',
      symbols: '기호 포함',
      regenerateButton: '비밀번호 다시 생성',
      description: `
        <h3>비밀번호 생성기 소개</h3>
        <p>비밀번호 생성기로 온라인 보안을 강화하세요. 이 도구는 지정한 기준에 따라 강력하고 무작위적인 비밀번호를 생성하여 계정 침해를 훨씬 더 어렵게 만듭니다.</p>
        <h3>사용 방법</h3>
        <ol>
          <li>슬라이더를 사용하여 원하는 비밀번호 길이를 설정합니다(6~32자).</li>
          <li>포함할 문자 유형(대문자, 소문자, 숫자, 기호)을 선택합니다.</li>
          <li>강력한 비밀번호가 자동으로 생성됩니다. 새 비밀번호를 원하시면 "다시 생성" 버튼을 클릭하세요.</li>
          <li>복사 아이콘을 클릭하여 비밀번호를 클립보드에 즉시 복사합니다.</li>
        </ol>
        <h3>장점</h3>
        <ul>
          <li><strong>강력한 보안:</strong> 추측하거나 해독하기 어려운 복잡한 비밀번호를 만듭니다.</li>
          <li><strong>사용자 정의 가능:</strong> 모든 웹사이트나 애플리케이션의 요구 사항에 맞게 비밀번호를 조정할 수 있습니다.</li>
          <li><strong>안전함:</strong> 전체 프로세스가 브라우저에서 실행됩니다. 비밀번호는 인터넷으로 전송되지 않습니다.</li>
        </ul>
      `
    },
    bmiCalculator: {
      metric: '미터법',
      imperial: '야드파운드법',
      weight: '체중',
      height: '신장',
      yourBmi: '나의 BMI 지수',
      underweight: '저체중',
      normal: '정상',
      overweight: '과체중',
      obese: '비만',
      description: `
        <h3>BMI 계산기 소개</h3>
        <p>체질량 지수(BMI) 계산기는 키에 비해 체중이 건강한 범위에 있는지 가늠하는 데 도움이 되는 간단한 도구입니다. 잠재적인 체중 문제를 식별하는 데 널리 사용되는 지표입니다.</p>
        <h3>사용 방법</h3>
        <ol>
          <li>선호하는 단위 시스템(미터법 또는 야드파운드법)을 선택합니다.</li>
          <li>해당 필드에 체중과 키를 입력합니다.</li>
          <li>BMI 점수와 체중 범주가 즉시 계산되어 표시됩니다.</li>
        </ol>
        <h3>장점</h3>
        <ul>
          <li><strong>빠른 건강 확인:</strong> 체중 상태에 대한 즉각적인 추정치를 얻을 수 있습니다.</li>
          <li><strong>두 단위 모두 지원:</strong> 사용자의 편의를 위해 미터법(kg, cm)과 야드파운드법(lbs, ft, in) 시스템을 모두 지원합니다.</li>
          <li><strong>명확한 결과:</strong> 숫자뿐만 아니라 "정상 체중" 또는 "과체중"과 같은 명확한 범주를 제공합니다.</li>
        </ul>
        <p><strong>면책 조항:</strong> 이 계산기는 정보 제공 목적으로만 사용됩니다. 종합적인 건강 평가는 의료 전문가와 상담하십시오.</p>
      `
    },
    exchangeRateCalculator: {
      amount: '금액',
      from: '보내는 통화',
      to: '받는 통화',
      swap: '통화 전환',
      disclaimer: '환율은 실시간 API를 통해 제공되며, 정보 제공 목적으로 약간의 지연이 있을 수 있습니다.',
      error: '환율 정보를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
      apiKeyMissing: '환율 서비스가 설정되지 않았습니다. API 키가 없습니다.',
      currencies: {
        USD: "미국 달러",
        EUR: "유로",
        JPY: "일본 엔",
        GBP: "영국 파운드",
        AUD: "호주 달러",
        CAD: "캐나다 달러",
        CHF: "스위스 프랑",
        CNY: "중국 위안",
        KRW: "대한민국 원",
      },
      description: `
        <h3>환율 계산기 소개</h3>
        <p>이 도구는 최신 환율을 기반으로 실시간 통화 변환을 제공합니다. 여행을 계획하거나, 온라인 쇼핑을 하거나, 국제 금융을 관리할 때 최신 환전 정보를 즉시 얻을 수 있습니다.</p>
        <h3>사용 방법</h3>
        <ol>
          <li>변환하려는 금액을 입력합니다.</li>
          <li>변환할 통화를 선택합니다.</li>
          <li>변환될 통화를 선택합니다.</li>
          <li>변환된 금액이 자동으로 계산되어 표시됩니다.</li>
        </ol>
        <h3>장점</h3>
        <ul>
          <li><strong>실시간 데이터:</strong> 실시간 API를 사용하여 현재 환율을 제공합니다 (환율에 약간의 지연이 있을 수 있음).</li>
          <li><strong>쉬운 사용법:</strong> 빠르고 간단한 통화 변환을 위한 직관적인 인터페이스.</li>
          <li><strong>디바운스 입력:</strong> 불필요한 요청을 피하기 위해 입력이 멈춘 후에 효율적으로 계산을 수행합니다.</li>
        </ul>
      `
    },
    percentageCalculator: {
      title: '숫자의 % 값은?',
      of: '의',
      result: '결과',
      description: `
        <h3>퍼센트 계산기 소개</h3>
        <p>일반적인 백분율 계산을 위한 간단하고 빠른 도구입니다. 할인을 계산하든, 팁을 계산하든, 수학 문제를 풀든, 이 계산기는 즉시 답을 제공합니다.</p>
        <h3>사용 방법</h3>
        <ol>
          <li>첫 번째 상자에 계산하려는 백분율을 입력합니다(예: 15%의 경우 15).</li>
          <li>두 번째 상자에 백분율을 계산할 기준 숫자를 입력합니다.</li>
          <li>결과가 실시간으로 계산되어 표시됩니다.</li>
        </ol>
        <h3>장점</h3>
        <ul>
          <li><strong>빠르고 쉬움:</strong> 일상적인 백분율 문제를 수동 계산 없이 해결합니다.</li>
          <li><strong>즉각적인 결과:</strong> 버튼을 클릭할 필요 없이 입력하는 대로 결과가 업데이트됩니다.</li>
          <li><strong>다용도:</strong> 쇼핑, 금융, 요리 및 학업 목적으로 유용합니다.</li>
        </ul>
      `
    },
    ageCalculator: {
      label: '생년월일을 입력하세요',
      yourAge: '현재 나이',
      years: '년',
      months: '개월',
      days: '일',
      description: `
        <h3>나이 계산기 소개</h3>
        <p>이 간단한 도구로 정확한 나이를 년, 월, 일 단위로 알아보세요. 생년월일을 입력하기만 하면 계산기가 현재 날짜를 기준으로 실제 나이를 즉시 계산합니다.</p>
        <h3>사용 방법</h3>
        <ol>
          <li>입력 필드를 클릭하고 달력에서 생년월일을 선택합니다.</li>
          <li>계산기가 자동으로 년, 월, 일로 세분화된 정확한 나이를 표시합니다.</li>
        </ol>
        <h3>장점</h3>
        <ul>
          <li><strong>정확한 계산:</strong> 단순히 햇수만이 아닌 정확한 나이를 제공합니다.</li>
          <li><strong>사용자 친화적:</strong> 입력을 위한 사용하기 쉬운 날짜 선택기가 특징입니다.</li>
          <li><strong>즉각적:</strong> 날짜를 선택하는 즉시 나이를 계산합니다.</li>
        </ul>
      `
    },
    barcodeGenerator: {
        dataLabel: "인코딩할 데이터",
        dataPlaceholder: "텍스트 또는 URL 입력",
        formatLabel: "바코드 형식",
        generateButton: "생성하기",
        downloadButton: "다운로드",
        errorInput: "바코드를 생성할 데이터를 입력하세요.",
        description: `
            <h3>바코드 생성기 소개</h3>
            <p>제품, 이벤트 또는 개인적인 용도로 다양한 유형의 바코드 및 QR 코드를 쉽게 만들 수 있습니다. 이 도구는 CODE128, EAN-13, QR 코드와 같은 인기 있는 형식을 지원하여 텍스트나 URL을 스캔 가능한 이미지로 변환합니다.</p>
            <h3>사용 방법</h3>
            <ol>
                <li>입력 필드에 인코딩할 데이터(텍스트, 숫자 또는 URL)를 입력합니다.</li>
                <li>드롭다운 메뉴에서 원하는 바코드 형식을 선택합니다.</li>
                <li>"생성하기" 버튼을 클릭하여 바코드 미리보기를 확인합니다.</li>
                <li>생성된 후 "다운로드" 버튼을 클릭하여 바코드를 PNG 이미지로 저장합니다.</li>
            </ol>
            <h3>장점</h3>
            <ul>
                <li><strong>다양한 형식 지원:</strong> 널리 사용되는 다양한 바코드 표준을 지원합니다.</li>
                <li><strong>즉시 미리보기:</strong> 바코드 또는 QR 코드를 생성하면서 바로 확인할 수 있습니다.</li>
                <li><strong>다운로드 가능:</strong> 생성된 바코드를 고품질 이미지로 저장하여 인쇄하거나 디지털 용도로 사용할 수 있습니다.</li>
            </ul>
        `
    },
    qrCodeGenerator: {
        dataLabel: "인코딩할 데이터",
        dataPlaceholder: "QR 코드로 만들 텍스트 또는 URL 입력",
        downloadButton: "QR 코드 다운로드",
        errorInput: "QR 코드를 생성할 데이터를 입력하세요.",
        description: `
            <h3>QR 코드 생성기 소개</h3>
            <p>어떤 텍스트나 URL로든 QR 코드를 빠르게 만들 수 있습니다. QR 코드는 웹사이트 링크, 연락처 정보, Wi-Fi 자격 증명과 같은 정보를 공유하는 편리한 방법입니다. 이 도구는 다운로드하여 어디서든 사용할 수 있는 고품질의 스캔 가능한 QR 코드를 생성합니다.</p>
            <h3>사용 방법</h3>
            <ol>
                <li>입력 필드에 인코딩할 텍스트나 URL을 입력합니다.</li>
                <li>QR 코드가 실시간으로 생성되어 표시됩니다.</li>
                <li>"QR 코드 다운로드" 버튼을 클릭하여 이미지를 PNG 파일로 저장합니다.</li>
            </ol>
            <h3>장점</h3>
            <ul>
                <li><strong>즉시 생성:</strong> 입력하는 동안 QR 코드가 업데이트되어 즉각적인 피드백을 제공합니다.</li>
                <li><strong>다용도:</strong> 웹사이트 URL, 일반 텍스트, 전화번호 등을 인코딩할 수 있습니다.</li>
                <li><strong>고품질 다운로드:</strong> 인쇄 및 디지털 사용에 적합한 선명하고 고해상도의 QR 코드 이미지를 저장합니다.</li>
            </ul>
        `
    },
    nicknameGenerator: {
        generateButton: "새 닉네임 생성",
        copyButton: "복사",
        copied: "복사됨!",
        description: `
            <h3>닉네임 생성기 소개</h3>
            <p>창의적인 사용자 이름이나 닉네임을 찾는 데 어려움을 겪고 있나요? 이 도구는 무작위 형용사와 명사를 조합하여 독특하고 재미있는 닉네임을 생성합니다. 게임, 소셜 미디어 또는 모든 온라인 플랫폼에 적합합니다.</p>
            <h3>사용 방법</h3>
            <ol>
                <li>"새 닉네임 생성" 버튼을 클릭합니다.</li>
                <li>새로운 무작위 닉네임이 표시 상자에 나타납니다.</li>
                <li>마음에 드는 닉네임을 찾을 때까지 계속 클릭하세요.</li>
                <li>"복사" 버튼을 클릭하여 클립보드에 저장합니다.</li>
            </ol>
            <h3>장점</h3>
            <ul>
                <li><strong>무한한 가능성:</strong> 수많은 독특한 조합을 생성합니다.</li>
                <li><strong>간단하고 빠름:</strong> 한 번의 클릭으로 새로운 닉네임을 얻을 수 있습니다.</li>
                <li><strong>재미와 창의성:</strong> 생각지도 못했던 재미있고 기억에 남는 닉네임을 발견할 수 있습니다.</li>
            </ul>
        `
    },
    mealPicker: {
        title: "오늘 뭐 먹지?",
        pickButton: "메뉴 추천받기!",
        resultPrefix: "오늘은",
        resultSuffix: " 어떠세요?",
        description: `
            <h3>메뉴 추천기 소개</h3>
            <p>점심이나 저녁으로 무엇을 먹을지 결정하기 힘든가요? 메뉴 추천기가 대신 결정해 드립니다! 이 도구는 엄선된 인기 요리 목록에서 무작위로 맛있는 식사를 제안하여 결정 장애를 극복하는 데 도움을 줍니다.</p>
            <h3>사용 방법</h3>
            <ol>
                <li>"메뉴 추천받기!" 버튼을 클릭하기만 하면 됩니다.</li>
                <li>도구가 무작위로 식사 제안을 선택하여 표시합니다.</li>
                <li>제안이 마음에 들지 않으면 다시 클릭하여 다른 제안을 받으세요.</li>
            </ol>
            <h3>장점</h3>
            <ul>
                <li><strong>결정 장애 해결:</strong> 다음 식사를 결정하는 빠르고 재미있는 방법입니다.</li>
                <li><strong>새로운 아이디어 발견:</strong> 오랫동안 먹지 않았던 요리를 상기시켜 줄 수 있습니다.</li>
                <li><strong>즉각적인 추천:</strong> 기다릴 필요 없이 클릭 한 번으로 제안을 받을 수 있습니다.</li>
            </ul>
        `
    },
    ddayCalculator: {
        eventTitleLabel: "이벤트 제목",
        eventTitlePlaceholder: "예: 내 생일",
        dateLabel: "목표 날짜",
        result: "결과",
        daysLeft: "일 남음",
        daysPassed: "일 지남",
        today: "바로 오늘입니다!",
        description: `
            <h3>D-Day 계산기 소개</h3>
            <p>D-Day 계산기로 중요한 예정된 이벤트나 기념일을 추적하세요. 목표 날짜를 설정하고 남은 날짜를 확인하거나, 중요한 이벤트로부터 며칠이 지났는지 계산할 수 있습니다.</p>
            <h3>사용 방법</h3>
            <ol>
                <li>이벤트 제목을 입력합니다(예: "휴가" 또는 "프로젝트 마감일").</li>
                <li>달력에서 목표 날짜를 선택합니다.</li>
                <li>계산기가 즉시 카운트다운(D-) 또는 카운트업(D+)을 일 단위로 표시합니다.</li>
            </ol>
            <h3>장점</h3>
            <ul>
                <li><strong>체계적인 관리:</strong> 시험, 휴일 또는 마감일과 같은 중요한 날짜를 절대 놓치지 마세요.</li>
                <li><strong>쉬운 시각화:</strong> 남은 날짜 또는 지난 날짜를 명확하게 표시합니다.</li>
                <li><strong>다용도:</strong> 미래의 이벤트와 과거의 이정표 모두에 유용합니다.</li>
            </ul>
        `
    },
    cagrCalculator: {
        startValueLabel: "초기 가치",
        endValueLabel: "최종 가치",
        yearsLabel: "기간 (년)",
        calculateButton: "CAGR 계산",
        resultTitle: "연평균 성장률 (CAGR)",
        description: `
            <h3>CAGR 계산기 소개</h3>
            <p>연평균 성장률(CAGR) 계산기는 지정된 기간 동안 투자의 연간 성장률을 측정하는 금융 도구입니다. 투자가 매년 일정한 비율로 성장했다고 가정하여 평탄화된 수익률을 제공합니다.</p>
            <h3>사용 방법</h3>
            <ol>
                <li>"초기 가치" 필드에 투자의 초기 가치를 입력합니다.</li>
                <li>"최종 가치" 필드에 최종 가치를 입력합니다.</li>
                <li>총 투자 기간을 년 단위로 입력합니다.</li>
                <li>"CAGR 계산"을 클릭하여 결과를 확인합니다.</li>
            </ol>
            <h3>장점</h3>
            <ul>
                <li><strong>표준화된 지표:</strong> 투자 성과를 비교하기 위한 명확하고 널리 인정되는 측정 기준을 제공합니다.</li>
                <li><strong>쉬운 사용법:</strong> 복잡한 금융 계산을 즉시 수행해 줍니다.</li>
                <li><strong>유용한 정보:</strong> 시간 경과에 따른 투자의 실제 성장을 이해하는 데 도움이 됩니다.</li>
            </ul>
        `
    },
    unitConverter: {
        categoryLabel: "카테고리",
        fromLabel: "변환 전 단위",
        toLabel: "변환 후 단위",
        categories: {
            length: "길이",
            weight: "무게",
            temperature: "온도",
        },
        units: {
            m: "미터 (m)",
            km: "킬로미터 (km)",
            cm: "센티미터 (cm)",
            mm: "밀리미터 (mm)",
            mi: "마일 (mi)",
            yd: "야드 (yd)",
            ft: "피트 (ft)",
            in: "인치 (in)",
            kg: "킬로그램 (kg)",
            g: "그램 (g)",
            mg: "밀리그램 (mg)",
            lb: "파운드 (lb)",
            oz: "온스 (oz)",
            c: "섭씨 (°C)",
            f: "화씨 (°F)",
            k: "켈빈 (K)",
        },
        description: `
            <h3>단위 변환기 소개</h3>
            <p>다양한 측정 단위 간 변환을 위한 다목적 필수 도구입니다. 길이, 무게 또는 온도를 변환해야 할 때, 이 변환기는 학생, 전문가 및 일상적인 사용을 위해 빠르고 정확한 결과를 제공합니다.</p>
            <h3>사용 방법</h3>
            <ol>
                <li>측정 카테고리를 선택합니다(예: 길이).</li>
                <li>입력 필드에 변환하려는 값을 입력합니다.</li>
                <li>변환할 단위를 선택합니다.</li>
                <li>변환될 단위를 선택합니다.</li>
                <li>변환된 결과가 즉시 표시됩니다.</li>
            </ol>
            <h3>장점</h3>
            <ul>
                <li><strong>포괄적:</strong> 길이, 무게, 온도의 일반적인 단위를 다룹니다.</li>
                <li><strong>실시간 결과:</strong> 입력하거나 단위를 변경하면 변환이 자동으로 업데이트됩니다.</li>
                <li><strong>사용자 친화적:</strong> 깔끔하고 직관적인 인터페이스로 변환이 빠르고 쉽습니다.</li>
            </ul>
        `
    },
    loanCalculator: {
        amountLabel: "대출 원금",
        rateLabel: "연이율 (%)",
        termLabel: "대출 기간 (년)",
        calculateButton: "계산하기",
        resultsTitle: "대출 요약",
        monthlyPayment: "월 상환금",
        totalInterest: "총 납부 이자",
        totalRepayment: "총 상환액",
        description: `
            <h3>대출 계산기 소개</h3>
            <p>이 도구는 대출의 재정적 영향을 이해하는 데 도움을 줍니다. 대출 금액, 이자율 및 기간을 입력하면 예상 월 상환금, 대출 기간 동안 지불할 총 이자 및 총 상환액을 계산할 수 있습니다.</p>
            <h3>사용 방법</h3>
            <ol>
                <li>빌리고자 하는 총 대출 금액을 입력합니다.</li>
                <li>대출의 연이율을 입력합니다.</li>
                <li>대출 기간을 년 단위로 지정합니다.</li>
                <li>"계산하기" 버튼을 클릭하여 대출에 대한 상세 요약을 확인합니다.</li>
            </ol>
            <h3>장점</h3>
            <ul>
                <li><strong>재정 계획:</strong> 월 상환 의무를 파악하여 효과적으로 예산을 책정하는 데 도움이 됩니다.</li>
                <li><strong>정보에 입각한 결정:</strong> 약정하기 전에 대출의 실제 비용을 이해할 수 있습니다.</li>
                <li><strong>쉬운 사용법:</strong> 복잡한 대출 계산을 몇 가지 간단한 단계로 단순화합니다.</li>
            </ul>
        `
    },
    about: {
        title: "ToolVerse 소개",
        content: `<h3>ToolVerse 소개</h3><p>ToolVerse는 일상적인 작업을 위한 유용한 유틸리티 모음을 제공하도록 설계된 다국어 웹 툴킷입니다. 저희의 목표는 전 세계 사용자에게 간단하고 강력하며 접근하기 쉬운 도구를 제공하는 것입니다.</p><h4>제공 도구</h4><p>현재 제공되는 도구는 다음과 같습니다:</p><ul><li><strong>텍스트 요약:</strong> AI를 사용하여 긴 기사와 텍스트를 간결한 요약으로 압축합니다.</li><li><strong>이미지 생성:</strong> 텍스트 설명으로 독특한 이미지를 만듭니다.</li><li><strong>JSON 포맷터:</strong> JSON 데이터의 유효성을 검사하고 쉽게 포맷합니다.</li><li><strong>색상 변환:</strong> HEX, RGB, HSL 형식 간에 색상을 변환합니다.</li><li><strong>비밀번호 생성:</strong> 강력하고 안전하며 사용자 정의 가능한 비밀번호를 만듭니다.</li></ul><h4>기술</h4><p>텍스트 요약 및 이미지 생성과 같은 일부 고급 기능은 Google의 Gemini API를 기반으로 하여 최첨단 AI 기능을 제공합니다.</p><h4>문의하기</h4><p>피드백과 제안을 환영합니다! 질문, 의견 또는 우려 사항이 있으시면 언제든지 다음 주소로 문의해 주세요: <a href="mailto:toolverse123@gmail.com" class="text-cyan-400 hover:underline">toolverse123@gmail.com</a>.</p>`
    },
    termsofservice: {
        title: "이용약관",
        content: `<h3>ToolVerse 이용약관</h3><p><strong>최종 업데이트: 2024-05-20</strong></p><p>ToolVerse에 오신 것을 환영합니다! 본 약관은 저희 웹사이트 사용에 대한 규칙 및 규정을 설명합니다.</p><h4>1. 약관 동의</h4><p>이 웹사이트에 접속함으로써 귀하는 본 약관에 동의하는 것으로 간주합니다. 이 페이지에 명시된 모든 약관에 동의하지 않으시면 ToolVerse 사용을 중단하십시오.</p><h4>2. 도구 사용</h4><p>ToolVerse는 다양한 온라인 유틸리티를 제공합니다. 귀하는 이러한 도구를 의도된 목적과 합법적인 방식으로 사용하는 데 동의합니다. 도구에 입력하는 모든 데이터에 대한 책임은 귀하에게 있습니다.</p><p>이 웹사이트에서 제공하는 도구에 민감한 개인 정보(예: 주민등록번호, 금융 정보, 건강 기록)를 입력해서는 안 됩니다.</p><h4>3. AI 기반 도구</h4><p>텍스트 요약 및 이미지 생성기는 Google Gemini API를 활용합니다. 이 도구를 사용함으로써 귀하는 제공하는 데이터(텍스트 또는 프롬프트)가 처리를 위해 Google로 전송되는 데 동의합니다. 원본 콘텐츠의 소유권은 귀하에게 있지만, 서비스를 제공하기 위해 콘텐츠를 사용할 수 있는 라이선스를 당사와 제3자 제공업체에 부여합니다.</p><p>이러한 AI 도구에 의해 생성된 결과물은 정보 제공 목적으로만 사용됩니다. 생성된 콘텐츠의 정확성, 완전성 또는 신뢰성을 보장하지 않습니다.</p><h4>4. 보증 부인</h4><p>ToolVerse의 서비스는 "있는 그대로" 제공됩니다. 당사는 명시적이거나 묵시적인 어떠한 보증도 하지 않으며, 상품성, 특정 목적에의 적합성, 지적 재산권 또는 기타 권리 비침해에 대한 묵시적인 보증이나 조건을 포함하되 이에 국한되지 않는 모든 기타 보증을 부인합니다.</p><h4>5. 책임 제한</h4><p>ToolVerse 또는 그 공급업체는 ToolVerse 웹사이트의 자료 사용 또는 사용 불능으로 인해 발생하는 모든 손해(데이터 또는 이익 손실, 사업 중단으로 인한 손해를 포함하되 이에 국한되지 않음)에 대해 어떠한 경우에도 책임을 지지 않습니다.</p><h4>6. 약관 변경</h4><p>당사는 사전 통지 없이 언제든지 본 이용약관을 개정할 수 있는 권리를 보유합니다. 이 웹사이트를 사용함으로써 귀하는 당시 최신 버전의 이용약관에 동의하는 것입니다.</p>`
    },
    privacypolicy: {
        title: "개인정보처리방침",
        content: `<h3>ToolVerse 개인정보처리방침</h3><p><strong>최종 업데이트: 2024-05-20</strong></p><p>본 개인정보처리방침은 귀하가 ToolVerse를 사용할 때 귀하의 정보가 어떻게 처리되는지를 설명합니다.</p><h4>1. 수집하는 정보</h4><p>당사는 서비스 제공을 위해 최소한의 정보만 수집하는 것을 목표로 합니다. 귀하가 제공하는 데이터(예: 요약을 위한 텍스트)는 귀하가 사용하는 특정 도구를 운영하기 위한 목적으로만 사용됩니다.</p><h4>2. 정보 사용 방법</h4><ul><li><strong>AI 도구:</strong> 텍스트와 프롬프트는 처리를 위해 Google Gemini API로 전송됩니다. 당사는 귀하의 입력이나 결과물을 저장하지 않습니다. Google의 데이터 처리 방식에 대해서는 Google의 개인정보처리방침을 참조하십시오.</li><li><strong>클라이언트 측 도구:</strong> JSON 포맷터 및 비밀번호 생성기와 같은 다른 도구는 전적으로 브라우저 내에서 작동합니다. 이 데이터는 당사 서버로 전송되지 않습니다.</li></ul><h4>3. 쿠키</h4><p>당사는 추적 목적으로 쿠키를 사용하지 않습니다. 언어 선택과 같은 기본 설정을 저장하기 위해 로컬 스토리지를 사용할 수 있으며, 이 정보는 귀하의 장치에만 저장됩니다.</p><h4>4. 제3자 서비스</h4><p>Google Gemini API로 구동되는 기능의 사용은 Google의 약관 및 개인정보처리방침의 적용을 받습니다.</p><h4>5. 문의하기</h4><p>본 개인정보처리방침에 대해 질문이 있으시면 다음 주소로 문의할 수 있습니다: <a href="mailto:toolverse123@gmail.com" class="text-cyan-400 hover:underline">toolverse123@gmail.com</a>.</p>`
    },
  },
};
type LocalizationContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        let fallbackResult: any = translations['en'];
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
          if (fallbackResult === undefined) {
            return key;
          }
        }
        return fallbackResult;
      }
    }
    return result;
  }, [language]);

  return React.createElement(
    LocalizationContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};