import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type Language = 'en' | 'ko' | 'zh' | 'ar';

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
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
  zh: {
    toolverse: '工具宇宙',
    viewOnGithub: '在 GitHub 上查看',
    tools: {
      Summarizer: '文本摘要',
      ImageGenerator: '图像生成',
      JsonFormatter: 'JSON 格式化',
      ColorConverter: '颜色转换',
      PasswordGenerator: '密码生成',
      BmiCalculator: 'BMI 计算器',
      ExchangeRateCalculator: '汇率计算器',
      PercentageCalculator: '百分比计算器',
      AgeCalculator: '年龄计算器',
      BarcodeGenerator: '条形码生成器',
      QrCodeGenerator: '二维码生成器',
      NicknameGenerator: '昵称生成器',
      MealPicker: '菜单选择器',
      DdayCalculator: 'D-Day 计算器',
      CagrCalculator: 'CAGR 计算器',
      UnitConverter: '单位转换器',
      LoanCalculator: '贷款计算器',
      About: '关于我们',
      TermsOfService: '服务条款',
      PrivacyPolicy: '隐私政策',
    },
    summarizer: {
      label: '输入要摘要的文本',
      placeholder: '在此处粘贴您的长文本...',
      button: '摘要文本',
      loading: '摘要中...',
      error: '生成摘要失败。请重试。',
      errorInput: '请输入一些文本进行摘要。',
      summaryTitle: '摘要',
      summaryPlaceholder: '正在生成摘要...',
      apiPrompt: '请简明扼要地总结以下文本：',
      apiSystemInstruction: '您是一位擅长将长文本总结为简短易懂段落的专家。请始终使用中文回答。',
      apiKeyMissing: '摘要服务未配置。缺少 Gemini API 密钥。',
      description: `
        <h3>关于文本摘要器</h3>
        <p>文本摘要器使用先进的人工智能（谷歌的 Gemini 模型）将长篇文章、论文或文件浓缩成简短易读的摘要。它通过从大量文本中提取要点来节省您的时间。</p>
        <h3>如何使用</h3>
        <ol>
          <li>复制您想要摘要的文本。</li>
          <li>将其粘贴到上方的文本区域中。</li>
          <li>点击“摘要文本”按钮。</li>
          <li>简洁的摘要将出现在下方的框中。</li>
        </ol>
        <h3>优点</h3>
        <ul>
          <li><strong>节省时间：</strong> 无需完整阅读即可快速掌握长文本的主要思想。</li>
          <li><strong>高效：</strong> 非常适合需要处理大量信息的学生、研究人员和专业人士。</li>
          <li><strong>AI 驱动：</strong> 利用强大的语言模型提供高质量、连贯的摘要。</li>
        </ul>
      `
    },
    imageGenerator: {
      label: '输入图像提示',
      placeholder: '例如：日落时的未来城市景观，霓虹灯',
      button: '生成图像',
      loading: '生成中...',
      error: '生成图像失败。请重试。',
      errorInput: '请输入提示以生成图像。',
      imagePlaceholder: '正在创建您的图像...',
      imageDefault: '您生成的图像将显示在此处。',
      apiKeyMissing: '图像生成服务未配置。缺少 Gemini API 密钥。',
      description: `
        <h3>关于图像生成器</h3>
        <p>使用 AI 图像生成器释放您的创造力。该工具由谷歌的 Imagen 模型提供支持，可将您的文本描述转换为独特、高质量的图像。只需描述您想看到的内容，AI 就会将其变为现实。</p>
        <h3>如何使用</h3>
        <ol>
          <li>在输入字段中输入描述性提示（例如，“一只戴着皇冠的雄伟狮子在奇幻森林中”）。</li>
          <li>点击“生成图像”按钮。</li>
          <li>等待片刻，让人工智能处理您的请求。</li>
          <li>生成的图像将显示在预览区域中。</li>
        </ol>
        <h3>优点</h3>
        <ul>
          <li><strong>创作自由：</strong> 创建您可以想象的任何图像，从逼真的肖像到超现实的风景。</li>
          <li><strong>独特的艺术作品：</strong> 为博客、社交媒体、演示文稿或个人项目生成独一无二的图像。</li>
          <li><strong>易于使用：</strong> 无需艺术技巧。如果您能描述它，就能创造它。</li>
        </ul>
      `
    },
    jsonFormatter: {
      label: '输入 JSON 数据',
      placeholder: '{ "key": "值", "nested": { "array": [1, 2, 3] } }',
      formatButton: '格式化 / 验证',
      clearButton: '清除',
      success: 'JSON 成功格式化。',
      error: '格式化失败：',
      errorInput: '输入为空。',
      invalidJson: '无效的 JSON 格式。',
      description: `
        <h3>关于 JSON 格式化程序</h3>
        <p>JSON 格式化程序和验证器是处理 JSON 数据的开发人员必不可少的工具。它可以帮助您将杂乱的 JSON 格式化为清晰、易于阅读的结构，并对其进行验证以确保没有语法错误。</p>
        <h3>如何使用</h3>
        <ol>
          <li>将您的原始或压缩的 JSON 数据粘贴到文本区域中。</li>
          <li>点击“格式化/验证”按钮。</li>
          <li>该工具将立即使用适当的缩进美化 JSON。</li>
          <li>状态消息将确认 JSON 是否有效，如果无效，则会指明错误。</li>
        </ol>
        <h3>优点</h3>
        <ul>
          <li><strong>提高可读性：</strong> 使复杂的 JSON 结构易于阅读和理解。</li>
          <li><strong>错误检测：</strong> 快速查找并修复 JSON 数据中的语法错误。</li>
          <li><strong>客户端处理：</strong> 您的数据在浏览器中安全处理，绝不会发送到服务器。</li>
        </ul>
      `
    },
    colorConverter: {
      hex: '十六进制',
      rgb: 'RGB',
      hsl: 'HSL',
      description: `
        <h3>关于颜色转换器</h3>
        <p>一个为网页设计师和开发人员准备的便捷工具。此工具允许您选择一种颜色并立即查看其在 HEX、RGB 和 HSL 格式中的相应值。您还可以通过单击复制任何这些值到剪贴板。</p>
        <h3>如何使用</h3>
        <ol>
          <li>使用颜色选择器选择您想要的颜色。预览圈将立即更新。</li>
          <li>HEX、RGB 和 HSL 值将自动更新。</li>
          <li>单击任何值旁边的复制图标将其复制到剪贴板。</li>
        </ol>
        <h3>优点</h3>
        <ul>
          <li><strong>实时转换：</strong> 在您选择颜色时，所有颜色格式都会立即更新。</li>
          <li><strong>简单直观：</strong> 简单的可视化界面使颜色转换变得毫不费力。</li>
          <li><strong>快速复制：</strong> 方便地复制颜色代码以在您的 CSS、设计工具或其他项目中使用。</li>
        </ul>
      `
    },
    passwordGenerator: {
      placeholder: '您的密码将显示在此处',
      copied: '已复制！',
      copyTitle: '复制到剪贴板',
      length: '密码长度',
      uppercase: '包含大写字母',
      lowercase: '包含小写字母',
      numbers: '包含数字',
      symbols: '包含符号',
      regenerateButton: '重新生成密码',
      description: `
        <h3>关于密码生成器</h3>
        <p>使用密码生成器增强您的在线安全。该工具根据您指定的标准创建强大、随机的密码，使您的帐户更难被破解。</p>
        <h3>如何使用</h3>
        <ol>
          <li>使用滑块设置所需的密码长度（6 到 32 个字符之间）。</li>
          <li>选择要包含的字符类型（大写、小写、数字、符号）。</li>
          <li>一个强密码会自动生成。点击“重新生成”按钮可获取新密码。</li>
          <li>点击复制图标可立即将密码复制到剪贴板。</li>
        </ol>
        <h3>优点</h3>
        <ul>
          <li><strong>强大的安全性：</strong> 创建难以猜测或破解的复杂密码。</li>
          <li><strong>可定制：</strong> 量身定制密码以满足任何网站或应用程序的要求。</li>
          <li><strong>安全：</strong> 整个过程在您的浏览器中运行；您的密码永远不会通过互联网发送。</li>
        </ul>
      `
    },
    bmiCalculator: {
      metric: '公制',
      imperial: '英制',
      weight: '体重',
      height: '身高',
      yourBmi: '你的BMI指数',
      underweight: '体重过轻',
      normal: '正常体重',
      overweight: '超重',
      obese: '肥胖',
      description: `
        <h3>关于 BMI 计算器</h3>
        <p>身体质量指数（BMI）计算器是一个简单的工具，可以帮助您判断您的体重相对于身高是否处于健康范围内。它是识别潜在体重问题的广泛使用的指标。</p>
        <h3>如何使用</h3>
        <ol>
          <li>选择您偏好的单位制（公制或英制）。</li>
          <li>在相应的字段中输入您的体重和身高。</li>
          <li>您的 BMI 分数和体重类别将立即计算并显示。</li>
        </ol>
        <h3>优点</h3>
        <ul>
          <li><strong>快速健康检查：</strong> 立即获取您的体重状况评估。</li>
          <li><strong>支持两种单位：</strong> 为方便起见，同时支持公制（公斤，厘米）和英制（磅，英尺，英寸）系统。</li>
          <li><strong>结果清晰：</strong> 不仅提供一个数字，还提供清晰的类别，如“正常体重”或“超重”。</li>
        </ul>
        <p><strong>免责声明：</strong> 此计算器仅供参考。请咨询医疗保健专业人员进行全面的健康评估。</p>
      `
    },
    exchangeRateCalculator: {
      amount: '金额',
      from: '从',
      to: '到',
      swap: '交换货币',
      disclaimer: '汇率由实时 API 提供，仅供参考，可能存在延迟。',
      error: '获取汇率失败。请稍后重试。',
      apiKeyMissing: '汇率服务未配置。缺少 API 密钥。',
      currencies: {
        USD: "美元",
        EUR: "欧元",
        JPY: "日元",
        GBP: "英镑",
        AUD: "澳大利亚元",
        CAD: "加拿大元",
        CHF: "瑞士法郎",
        CNY: "人民币",
        KRW: "韩元",
      },
      description: `
        <h3>关于汇率计算器</h3>
        <p>该工具根据最新汇率提供实时货币转换。无论您是计划旅行、在线购物还是管理国际财务，都可以立即获得最新的转换信息。</p>
        <h3>如何使用</h3>
        <ol>
          <li>输入您要转换的金额。</li>
          <li>选择您要转换的源货币。</li>
          <li>选择您要转换的目标货币。</li>
          <li>转换后的金额将自动计算并显示。</li>
        </ol>
        <h3>优点</h3>
        <ul>
          <li><strong>实时数据：</strong> 使用实时 API 提供当前汇率（汇率可能略有延迟）。</li>
          <li><strong>易于使用：</strong> 简单直接的界面，可进行快速简便的货币转换。</li>
          <li><strong>延迟输入：</strong> 在您停止输入后高效执行计算，以避免过多的请求。</li>
        </ul>
      `
    },
    percentageCalculator: {
      title: '一个数的百分比是多少？',
      of: '的',
      result: '结果',
      description: `
        <h3>关于百分比计算器</h3>
        <p>一个用于执行常见百分比计算的简单快速的工具。无论您是计算折扣、计算小费还是解决数学问题，此计算器都能立即为您提供答案。</p>
        <h3>如何使用</h3>
        <ol>
          <li>在第一个框中输入您要计算的百分比（例如，15% 则输入 15）。</li>
          <li>在第二个框中输入您要计算其百分比的基数。</li>
          <li>结果会实时计算并显示。</li>
        </ol>
        <h3>优点</h3>
        <ul>
          <li><strong>快速简便：</strong> 无需手动计算即可解决日常百分比问题。</li>
          <li><strong>即时结果：</strong> 无需单击按钮；结果在您输入时即时更新。</li>
          <li><strong>用途广泛：</strong> 对购物、金融、烹饪和学术目的都很有用。</li>
        </ul>
      `
    },
    ageCalculator: {
      label: '输入您的出生日期',
      yourAge: '您的年龄',
      years: '岁',
      months: '月',
      days: '天',
      description: `
        <h3>关于年龄计算器</h3>
        <p>使用这个简单的工具，可以查明您以年、月、日为单位的精确年龄。只需输入您的出生日期，计算器就会根据当前日期立即计算出您的实际年龄。</p>
        <h3>如何使用</h3>
        <ol>
          <li>点击输入字段，从日历中选择您的出生日期。</li>
          <li>计算器将自动显示您分解为年、月、日的精确年龄。</li>
        </ol>
        <h3>优点</h3>
        <ul>
          <li><strong>精确计算：</strong> 提供确切的年龄，而不仅仅是年数。</li>
          <li><strong>用户友好：</strong> 具有易于使用的日期选择器进行输入。</li>
          <li><strong>即时性：</strong> 选择日期后立即计算您的年龄。</li>
        </ul>
      `
    },
    barcodeGenerator: {
        dataLabel: "要编码的数据",
        dataPlaceholder: "输入文本或网址",
        formatLabel: "条形码格式",
        generateButton: "生成",
        downloadButton: "下载",
        errorInput: "请输入数据以生成条形码。",
        description: `
            <h3>关于条形码生成器</h3>
            <p>轻松为您的产品、活动或个人用途创建各种类型的条形码和二维码。此工具支持 CODE128、EAN-13 和二维码等流行格式，将您的文本或网址转换为可扫描的图像。</p>
            <h3>如何使用</h3>
            <ol>
                <li>在输入字段中输入您要编码的数据（文本、数字或网址）。</li>
                <li>从下拉菜单中选择所需的条形码格式。</li>
                <li>点击“生成”按钮查看条形码预览。</li>
                <li>生成后，点击“下载”按钮将条形码另存为 PNG 图像。</li>
            </ol>
            <h3>优点</h3>
            <ul>
                <li><strong>多种格式：</strong> 支持多种常见的条形码标准。</li>
                <li><strong>即时预览：</strong> 在创建时即可看到您的条形码或二维码。</li>
                <li><strong>可下载：</strong> 将生成的条形码保存为高质量图像，用于打印或数字用途。</li>
            </ul>
        `
    },
    qrCodeGenerator: {
        dataLabel: "要编码的数据",
        dataPlaceholder: "输入用于二维码的文本或网址",
        downloadButton: "下载二维码",
        errorInput: "请输入数据以生成二维码。",
        description: `
            <h3>关于二维码生成器</h3>
            <p>从任何文本或网址快速创建二维码。二维码是共享网站链接、联系方式或 Wi-Fi 凭据等信息的便捷方式。此工具可生成高质量、可扫描的二维码，您可以下载并在任何地方使用。</p>
            <h3>如何使用</h3>
            <ol>
                <li>在输入字段中输入您要编码的文本或网址。</li>
                <li>二维码将实时生成并显示。</li>
                <li>点击“下载二维码”按钮将图像另存为 PNG 文件。</li>
            </ol>
            <h3>优点</h3>
            <ul>
                <li><strong>即时生成：</strong> 二维码在您键入时更新，提供即时反馈。</li>
                <li><strong>用途广泛：</strong> 编码网站网址、纯文本、电话号码等。</li>
                <li><strong>高质量下载：</strong> 保存清晰、高分辨率的二维码图像，适用于打印和数字用途。</li>
            </ul>
        `
    },
    nicknameGenerator: {
        generateButton: "生成新昵称",
        copyButton: "复制",
        copied: "已复制！",
        description: `
            <h3>关于昵称生成器</h3>
            <p>在寻找创意用户名或昵称时遇到困难？此工具通过组合随机形容词和名词来生成独特有趣的昵称。它非常适合游戏、社交媒体或任何在线平台。</p>
            <h3>如何使用</h3>
            <ol>
                <li>点击“生成新昵称”按钮。</li>
                <li>一个新的随机昵称将出现在显示框中。</li>
                <li>不断点击，直到找到您喜欢的昵称。</li>
                <li>点击“复制”按钮将其保存到剪贴板。</li>
            </ol>
            <h3>优点</h3>
            <ul>
                <li><strong>无限可能：</strong> 生成大量独特的组合。</li>
                <li><strong>简单快速：</strong> 单击即可获得新昵称。</li>
                <li><strong>有趣且富有创意：</strong> 发现您意想不到的有趣且难忘的昵称。</li>
            </ul>
        `
    },
    mealPicker: {
        title: "我该吃什么？",
        pickButton: "推荐一个菜单！",
        resultPrefix: "今天吃",
        resultSuffix: "怎么样？",
        description: `
            <h3>关于菜单选择器</h3>
            <p>无法决定午餐或晚餐吃什么？让菜单选择器为您做决定！此工具从精心策划的流行菜肴列表中随机推荐一道美味佳肴，帮助您克服决策疲劳。</p>
            <h3>如何使用</h3>
            <ol>
                <li>只需点击“推荐一个菜单！”按钮。</li>
                <li>该工具将随机选择并显示一个用餐建议。</li>
                <li>如果您不喜欢这个建议，只需再次点击即可获得另一个建议。</li>
            </ol>
            <h3>优点</h3>
            <ul>
                <li><strong>解决优柔寡断：</strong> 一种快速有趣的方式来决定您的下一餐。</li>
                <li><strong>发现新想法：</strong> 可能会提醒您一道您很久没吃的菜。</li>
                <li><strong>即时性：</strong> 无需等待，只需点击一下即可获得建议。</li>
            </ul>
        `
    },
    ddayCalculator: {
        eventTitleLabel: "事件标题",
        eventTitlePlaceholder: "例如：我的生日",
        dateLabel: "目标日期",
        result: "结果",
        daysLeft: "天剩余",
        daysPassed: "天已过",
        today: "就是今天！",
        description: `
            <h3>关于 D-Day 计算器</h3>
            <p>使用 D-Day 计算器跟踪重要的即将到来的事件或纪念日。设置一个目标日期，查看还剩多少天，或计算自某个重要事件以来已经过去了多少天。</p>
            <h3>如何使用</h3>
            <ol>
                <li>为您的事件输入一个标题（例如，“假期”或“项目截止日期”）。</li>
                <li>从日历中选择目标日期。</li>
                <li>计算器将立即以天为单位显示倒计时（D-）或正计时（D+）。</li>
            </ol>
            <h3>优点</h3>
            <ul>
                <li><strong>保持井井有条：</strong> 绝不会忘记考试、假期或截止日期等重要日期。</li>
                <li><strong>轻松可视化：</strong> 清晰显示剩余或过去的天数。</li>
                <li><strong>用途广泛：</strong> 对未来事件和过去里程碑都很有用。</li>
            </ul>
        `
    },
    cagrCalculator: {
        startValueLabel: "初始值",
        endValueLabel: "最终值",
        yearsLabel: "年数",
        calculateButton: "计算 CAGR",
        resultTitle: "年复合增长率 (CAGR)",
        description: `
            <h3>关于 CAGR 计算器</h3>
            <p>复合年增长率（CAGR）计算器是一种金融工具，用于衡量一项投资在特定时期内的年增长率。它提供了一个平滑的收益率，假设投资每年以稳定的速度增长。</p>
            <h3>如何使用</h3>
            <ol>
                <li>在“初始值”字段中输入投资的初始价值。</li>
                <li>在“最终值”字段中输入最终价值。</li>
                <li>以年为单位输入投资的总持续时间。</li>
                <li>点击“计算 CAGR”查看结果。</li>
            </ol>
            <h3>优点</h3>
            <ul>
                <li><strong>标准化指标：</strong> 提供了一个清晰且被广泛接受的衡量标准，用于比较投资表现。</li>
                <li><strong>使用简单：</strong> 为您即时完成复杂的财务计算。</li>
                <li><strong>信息丰富：</strong> 有助于了解一项投资随时间的真实增长情况。</li>
            </ul>
        `
    },
    unitConverter: {
        categoryLabel: "类别",
        fromLabel: "从",
        toLabel: "到",
        categories: {
            length: "长度",
            weight: "重量",
            temperature: "温度",
        },
        units: {
            m: "米 (m)",
            km: "公里 (km)",
            cm: "厘米 (cm)",
            mm: "毫米 (mm)",
            mi: "英里 (mi)",
            yd: "码 (yd)",
            ft: "英尺 (ft)",
            in: "英寸 (in)",
            kg: "公斤 (kg)",
            g: "克 (g)",
            mg: "毫克 (mg)",
            lb: "磅 (lb)",
            oz: "盎司 (oz)",
            c: "摄氏度 (°C)",
            f: "华氏度 (°F)",
            k: "开尔文 (K)",
        },
        description: `
            <h3>关于单位转换器</h3>
            <p>一个多功能且必不可少的工具，用于在各种计量单位之间进行转换。无论您需要转换长度、重量还是温度，此转换器都能为学生、专业人士和日常使用提供快速准确的结果。</p>
            <h3>如何使用</h3>
            <ol>
                <li>选择计量类别（例如，长度）。</li>
                <li>在输入字段中输入您希望转换的值。</li>
                <li>选择您要转换的单位。</li>
                <li>选择您希望转换到的单位。</li>
                <li>转换结果会立即显示。</li>
            </ol>
            <h3>优点</h3>
            <ul>
                <li><strong>全面：</strong> 涵盖长度、重量和温度的常用单位。</li>
                <li><strong>实时结果：</strong> 在您键入或更改单位时，转换会自动更新。</li>
                <li><strong>用户友好：</strong> 简洁直观的界面使转换快速简便。</li>
            </ul>
        `
    },
    loanCalculator: {
        amountLabel: "贷款金额",
        rateLabel: "年利率 (%)",
        termLabel: "贷款期限（年）",
        calculateButton: "计算",
        resultsTitle: "贷款摘要",
        monthlyPayment: "每月还款",
        totalInterest: "总支付利息",
        totalRepayment: "总还款额",
        description: `
            <h3>关于贷款计算器</h3>
            <p>此工具可帮助您了解贷款的财务影响。通过输入贷款金额、利率和期限，您可以计算出您的预计每月还款额、在贷款期内将支付的总利息以及您将偿还的总金额。</p>
            <h3>如何使用</h3>
            <ol>
                <li>输入您希望借入的总贷款金额。</li>
                <li>输入贷款的年利率。</li>
                <li>以年为单位指定贷款期限。</li>
                <li>点击“计算”按钮查看您的贷款详细摘要。</li>
            </ol>
            <h3>优点</h3>
            <ul>
                <li><strong>财务规划：</strong> 通过了解您的每月还款义务，帮助您有效进行预算。</li>
                <li><strong>明智决策：</strong> 在承诺之前了解贷款的真实成本。</li>
                <li><strong>易于使用：</strong> 将复杂的贷款计算简化为几个简单的步骤。</li>
            </ul>
        `
    },
    about: {
        title: "关于 ToolVerse",
        content: `<h3>关于 ToolVerse</h3><p>ToolVerse 是一个多功能的多语言网络工具包，旨在为日常任务提供一系列有用的实用程序。我们的目标是为全球用户提供简单、强大且易于访问的工具。</p><h4>我们的工具</h4><p>我们目前的工具套件包括：</p><ul><li><strong>文本摘要器：</strong> 使用 AI 将长篇文章和文本浓缩为简洁的摘要。</li><li><strong>图像生成器：</strong> 从文本描述创建独特的图像。</li><li><strong>JSON 格式化程序：</strong> 轻松验证和格式化您的 JSON 数据。</li><li><strong>颜色转换器：</strong> 在 HEX、RGB 和 HSL 格式之间转换颜色。</li><li><strong>密码生成器：</strong> 创建强大、安全且可自定义的密码。</li></ul><h4>我们的技术</h4><p>我们的一些高级功能，如文本摘要器和图像生成器，由 Google 的 Gemini API 提供支持，提供最先进的 AI 功能。</p><h4>联系我们</h4><p>我们欢迎您的反馈和建议！如果您有任何问题、意见或疑虑，请随时通过以下方式与我们联系：<a href="mailto:toolverse123@gmail.com" class="text-cyan-400 hover:underline">toolverse123@gmail.com</a>。</p>`
    },
    termsofservice: {
        title: "服务条款",
        content: `<h3>ToolVerse 服务条款</h3><p><strong>最后更新：2024-05-20</strong></p><p>欢迎来到 ToolVerse！这些条款和条件概述了使用我们网站的规则和规定。</p><h4>1. 接受条款</h4><p>通过访问本网站，我们假定您接受这些条款和条件。如果您不同意本页面上说明的所有条款和条件，请不要继续使用 ToolVerse。</p><h4>2. 工具的使用</h4><p>ToolVerse 提供各种在线实用程序。您同意将这些工具用于其预期目的并以合法方式使用。您对输入到我们工具中的任何数据负责。</p><p>您不得在本网站提供的任何工具中输入任何敏感的个人信息（例如，社会安全号码、财务信息、健康记录）。</p><h4>3. AI 驱动的工具</h4><p>我们的文本摘要器和图像生成器使用 Google Gemini API。使用这些工具，即表示您同意您提供的数据（文本或提示）将被发送到 Google 进行处理。您保留对原始内容的所有权，但您授予我们和我们的第三方提供商使用内容以提供服务的许可。</p><p>这些 AI 工具生成的输出仅供参考。我们不保证生成内容的准确性、完整性或可靠性。</p><h4>4. 免责声明</h4><p>ToolVerse 上的服务按“原样”提供。我们不作任何明示或暗示的保证，并在此否认所有其他保证，包括但不限于适销性、特定用途适用性或不侵犯知识产权或其他侵犯权利的默示保证或条件。</p><h4>5. 责任限制</h4><p>在任何情况下，ToolVerse 或其供应商均不对因使用或无法使用 ToolVerse 网站上的材料而引起的任何损害（包括但不限于数据或利润损失或业务中断造成的损害）承担责任。</p><h4>6. 条款变更</h4><p>我们保留随时修改这些服务条款的权利，恕不另行通知。使用本网站，即表示您同意受当时最新版本的这些服务条款的约束。</p>`
    },
    privacypolicy: {
        title: "隐私政策",
        content: `<h3>ToolVerse 隐私政策</h3><p><strong>最后更新：2024-05-20</strong></p><p>本隐私政策描述了您在使用 ToolVerse 时如何处理您的信息。</p><h4>1. 我们收集的信息</h4><p>我们的目标是尽可能少地收集信息。您提供的数据（例如，用于摘要的文本）仅用于操作您正在使用的特定工具。</p><h4>2. 我们如何使用信息</h4><ul><li><strong>AI 工具：</strong> 文本和提示将发送到 Google Gemini API 进行处理。我们不存储您的输入或输出。有关其数据处理惯例，请参阅 Google 的隐私政策。</li><li><strong>客户端工具：</strong> 其他工具（如 JSON 格式化程序和密码生成器）完全在您的浏览器中运行。此数据不会发送到我们的服务器。</li></ul><h4>3. Cookie</h4><p>我们不使用 Cookie 进行跟踪。我们可能会使用本地存储来保存语言选择等偏好设置，这些信息仅存储在您的设备上。</p><h4>4. 第三方服务</h4><p>您对由 Google Gemini API 提供支持的功能的使用受 Google 的条款和隐私政策的约束。</p><h4>5. 联系我们</h4><p>如果您对本隐私政策有任何疑问，可以通过以下方式与我们联系：<a href="mailto:toolverse123@gmail.com" class="text-cyan-400 hover:underline">toolverse123@gmail.com</a>。</p>`
    },
  },
// toolverse123-droid/toolverse/toolverse-8e21c08f808538925b7d76b20c163902921ced90/i18n.ts 파일의 ar: { ... } 블록 전체를 아래 코드로 교체

  ar: {
    toolverse: 'عالم الأدوات',
    viewOnGithub: 'عرض على GitHub',
    tools: {
      Summarizer: 'ملخص النصوص',
      ImageGenerator: 'مولد الصور',
      JsonFormatter: 'منسق JSON',
      ColorConverter: 'محول الألوان',
      PasswordGenerator: 'مولد كلمات المرور',
      BmiCalculator: 'حاسبة مؤشر كتلة الجسم',
      ExchangeRateCalculator: 'حاسبة أسعار الصرف',
      PercentageCalculator: 'حاسبة النسبة المئوية',
      AgeCalculator: 'حاسبة العمر',
      BarcodeGenerator: 'مولد الباركود',
      QrCodeGenerator: 'مولد رمز QR',
      NicknameGenerator: 'مولد الألقاب',
      MealPicker: 'منتقي الوجبات',
      DdayCalculator: 'حاسبة D-Day',
      CagrCalculator: 'حاسبة CAGR',
      UnitConverter: 'محول الوحدات',
      LoanCalculator: 'حاسبة القروض',
      About: 'معلومات عنا',
      TermsOfService: 'شروط الخدمة',
      PrivacyPolicy: 'سياسة الخصوصية',
    },
    summarizer: {
      label: 'أدخل النص لتلخيصه',
      placeholder: 'الصق نصك الطويل هنا...',
      button: 'لخص النص',
      loading: 'جارٍ التلخيص...',
      error: 'فشل في إنشاء الملخص. الرجاء المحاولة مرة أخرى.',
      errorInput: 'الرجاء إدخال بعض النصوص لتلخيصها.',
      summaryTitle: 'الملخص',
      summaryPlaceholder: 'جارٍ إنشاء الملخص...',
      apiPrompt: 'لخص النص التالي بإيجاز:',
      apiSystemInstruction: 'أنت خبير في تلخيص النصوص الطويلة في فقرات قصيرة وسهلة الفهم. يجب أن تكون إجابتك دائمًا باللغة العربية.',
      apiKeyMissing: 'خدمة التلخيص غير مهيأة. مفتاح Gemini API مفقود.',
      description: `
        <div dir="rtl">
        <h3>عن ملخص النصوص</h3>
        <p>يستخدم ملخص النصوص الذكاء الاصطناعي المتقدم (نموذج Gemini من Google) لتكثيف المقالات الطويلة أو الأبحاث أو المستندات إلى ملخص قصير وسهل القراءة. يوفر وقتك عن طريق استخلاص النقاط الرئيسية من كمية كبيرة من النصوص.</p>
        <h3>كيفية الاستخدام</h3>
        <ol>
          <li>انسخ النص الذي تريد تلخيصه.</li>
          <li>الصقه في منطقة النص أعلاه.</li>
          <li>انقر على زر "لخص النص".</li>
          <li>سيظهر الملخص الموجز في المربع أدناه.</li>
        </ol>
        <h3>المزايا</h3>
        <ul>
          <li><strong>توفير الوقت:</strong> استيعاب الأفكار الرئيسية للنصوص الطويلة بسرعة دون قراءتها بالكامل.</li>
          <li><strong>الكفاءة:</strong> مثالي للطلاب والباحثين والمحترفين الذين يحتاجون إلى معالجة كميات كبيرة من المعلومات.</li>
          <li><strong>مدعوم بالذكاء الاصطناعي:</strong> يستفيد من نموذج لغوي قوي لملخصات عالية الجودة ومتماسكة.</li>
        </ul>
        </div>
      `
    },
    imageGenerator: {
      label: 'أدخل وصف الصورة',
      placeholder: 'مثال: منظر مدينة مستقبلي عند غروب الشمس، أضواء نيون',
      button: 'إنشاء صورة',
      loading: 'جارٍ الإنشاء...',
      error: 'فشل في إنشاء الصورة. الرجاء المحاولة مرة أخرى.',
      errorInput: 'الرجاء إدخال وصف لإنشاء صورة.',
      imagePlaceholder: 'جارٍ إنشاء صورتك...',
      imageDefault: 'ستظهر صورتك التي تم إنشاؤها هنا.',
      apiKeyMissing: 'خدمة مولد الصور غير مهيأة. مفتاح Gemini API مفقود.',
      description: `
        <div dir="rtl">
        <h3>عن مولد الصور</h3>
        <p>أطلق العنان لإبداعك مع مولد الصور بالذكاء الاصطناعي. تعمل هذه الأداة، المدعومة بنموذج Imagen من Google، على تحويل أوصافك النصية إلى صور فريدة وعالية الجودة. فقط صف ما تريد رؤيته، وسيقوم الذكاء الاصطناعي بتحويله إلى حقيقة.</p>
        <h3>كيفية الاستخدام</h3>
        <ol>
          <li>اكتب وصفًا تفصيليًا في حقل الإدخال (مثال: "أسد مهيب يرتدي تاجًا في غابة خيالية").</li>
          <li>انقر على زر "إنشاء صورة".</li>
          <li>انتظر بضع لحظات حتى يقوم الذكاء الاصطناعي بمعالجة طلبك.</li>
          <li>سيتم عرض الصورة التي تم إنشاؤها في منطقة المعاينة.</li>
        </ol>
        <h3>المزايا</h3>
        <ul>
          <li><strong>حرية إبداعية:</strong> قم بإنشاء أي صورة يمكنك تخيلها، من الصور الواقعية إلى المناظر الطبيعية السريالية.</li>
          <li><strong>أعمال فنية فريدة:</strong> أنشئ صورًا فريدة من نوعها للمدونات أو وسائل التواصل الاجتماعي أو العروض التقديمية أو المشاريع الشخصية.</li>
          <li><strong>سهل الاستخدام:</strong> لا يتطلب أي مهارة فنية. إذا كان يمكنك وصفه، يمكنك إنشاؤه.</li>
        </ul>
        </div>
      `
    },
    jsonFormatter: {
      label: 'أدخل بيانات JSON',
      placeholder: '{ "key": "قيمة", "nested": { "array": [1, 2, 3] } }',
      formatButton: 'تنسيق / تحقق',
      clearButton: 'مسح',
      success: 'تم تنسيق JSON بنجاح.',
      error: 'فشل التنسيق: ',
      errorInput: 'الإدخال فارغ.',
      invalidJson: 'تنسيق JSON غير صالح.',
      description: `
        <div dir="rtl">
        <h3>عن منسق JSON</h3>
        <p>منسق ومحقق JSON هو أداة أساسية للمطورين الذين يعملون مع بيانات JSON. يساعدك على تنسيق JSON غير المرتب إلى بنية نظيفة وسهلة القراءة ويتحقق من صحتها لضمان خلوها من الأخطاء النحوية.</p>
        <h3>كيفية الاستخدام</h3>
        <ol>
          <li>الصق بيانات JSON الأولية أو المصغرة في منطقة النص.</li>
          <li>انقر على زر "تنسيق / تحقق".</li>
          <li>ستقوم الأداة على الفور بتجميل JSON بالمسافات البادئة المناسبة.</li>
          <li>ستؤكد رسالة الحالة ما إذا كان JSON صالحًا أم ستحدد الخطأ إن لم يكن كذلك.</li>
        </ol>
        <h3>المزايا</h3>
        <ul>
          <li><strong>تحسين القراءة:</strong> يجعل هياكل JSON المعقدة سهلة القراءة والفهم.</li>
          <li><strong>اكتشاف الأخطاء:</strong> العثور بسرعة على الأخطاء النحوية في بيانات JSON وإصلاحها.</li>
          <li><strong>المعالجة من جانب العميل:</strong> تتم معالجة بياناتك بأمان في متصفحك ولا يتم إرسالها أبدًا إلى خادم.</li>
        </ul>
        </div>
      `
    },
    colorConverter: {
      hex: 'سداسي عشري',
      rgb: 'RGB',
      hsl: 'HSL',
      description: `
        <div dir="rtl">
        <h3>عن محول الألوان</h3>
        <p>أداة مفيدة لمصممي ومطوري الويب. تتيح لك هذه الأداة اختيار لون ورؤية قيمه المقابلة على الفور بتنسيقات HEX و RGB و HSL. يمكنك أيضًا نسخ أي من هذه القيم إلى حافظتك بنقرة واحدة.</p>
        <h3>كيفية الاستخدام</h3>
        <ol>
          <li>استخدم منتقي الألوان لتحديد اللون الذي تريده. سيتم تحديث دائرة المعاينة على الفور.</li>
          <li>سيتم تحديث قيم HEX و RGB و HSL تلقائيًا.</li>
          <li>انقر على أيقونة النسخ بجانب أي قيمة لنسخها إلى حافظتك.</li>
        </ol>
        <h3>المزايا</h3>
        <ul>
          <li><strong>تحويل في الوقت الفعلي:</strong> شاهد تحديث جميع تنسيقات الألوان فور اختيارك للون.</li>
          <li><strong>سهل وبديهي:</strong> واجهة مرئية بسيطة تجعل تحويل الألوان سهلاً.</li>
          <li><strong>نسخ سريع:</strong> انسخ رموز الألوان بسهولة لاستخدامها في CSS أو أدوات التصميم أو المشاريع الأخرى.</li>
        </ul>
        </div>
      `
    },
    passwordGenerator: {
      placeholder: 'ستظهر كلمة المرور الخاصة بك هنا',
      copied: 'تم النسخ!',
      copyTitle: 'نسخ إلى الحافظة',
      length: 'طول كلمة المرور',
      uppercase: 'تضمين أحرف كبيرة',
      lowercase: 'تضمين أحرف صغيرة',
      numbers: 'تضمين أرقام',
      symbols: 'تضمين رموز',
      regenerateButton: 'إعادة إنشاء كلمة المرور',
      description: `
        <div dir="rtl">
        <h3>عن مولد كلمات المرور</h3>
        <p>عزز أمانك عبر الإنترنت باستخدام مولد كلمات المرور. تنشئ هذه الأداة كلمات مرور قوية وعشوائية بناءً على المعايير التي تحددها، مما يجعل اختراق حساباتك أكثر صعوبة.</p>
        <h3>كيفية الاستخدام</h3>
        <ol>
          <li>استخدم شريط التمرير لضبط طول كلمة المرور المطلوب (بين 6 و 32 حرفًا).</li>
          <li>حدد أنواع الأحرف التي تريد تضمينها (أحرف كبيرة، أحرف صغيرة، أرقام، رموز).</li>
          <li>يتم إنشاء كلمة مرور قوية تلقائيًا. انقر فوق زر "إعادة الإنشاء" للحصول على واحدة جديدة.</li>
          <li>انقر فوق أيقونة النسخ لنسخ كلمة المرور على الفور إلى حافظتك.</li>
        </ol>
        <h3>المزايا</h3>
        <ul>
          <li><strong>أمان قوي:</strong> ينشئ كلمات مرور معقدة يصعب تخمينها أو كسرها.</li>
          <li><strong>قابل للتخصيص:</strong> صمم كلمة المرور لتلبية متطلبات أي موقع ويب أو تطبيق.</li>
          <li><strong>آمن:</strong> تعمل العملية بأكملها في متصفحك؛ لا يتم إرسال كلمة المرور الخاصة بك عبر الإنترنت أبدًا.</li>
        </ul>
        </div>
      `
    },
    bmiCalculator: {
      metric: 'النظام المتري',
      imperial: 'النظام الإمبراطوري',
      weight: 'الوزن',
      height: 'الطول',
      yourBmi: 'مؤشر كتلة جسمك',
      underweight: 'نقص الوزن',
      normal: 'وزن طبيعي',
      overweight: 'زيادة الوزن',
      obese: 'سمنة',
      description: `
        <div dir="rtl">
        <h3>عن حاسبة مؤشر كتلة الجسم</h3>
        <p>حاسبة مؤشر كتلة الجسم (BMI) هي أداة بسيطة لمساعدتك على قياس ما إذا كان وزنك ضمن النطاق الصحي لطولك. وهو مؤشر يستخدم على نطاق واسع لتحديد مشاكل الوزن المحتملة.</p>
        <h3>كيفية الاستخدام</h3>
        <ol>
          <li>اختر نظام الوحدات المفضل لديك (متري أو إمبراطوري).</li>
          <li>أدخل وزنك وطولك في الحقول المقابلة.</li>
          <li>سيتم حساب وعرض درجة مؤشر كتلة الجسم وفئة الوزن على الفور.</li>
        </ol>
        <h3>المزايا</h3>
        <ul>
          <li><strong>فحص صحي سريع:</strong> احصل على تقدير فوري لحالة وزنك.</li>
          <li><strong>يدعم كلا النظامين:</strong> يعمل مع كل من النظامين المتري (كجم، سم) والإمبراطوري (رطل، قدم، بوصة) لراحتك.</li>
          <li><strong>نتائج واضحة:</strong> لا يوفر رقمًا فحسب، بل يوفر أيضًا فئة واضحة مثل "وزن طبيعي" أو "زيادة الوزن".</li>
        </ul>
        <p><strong>إخلاء مسؤولية:</strong> هذه الحاسبة للأغراض الإعلامية فقط. استشر أخصائي رعاية صحية لإجراء تقييم صحي شامل.</p>
        </div>
      `
    },
    exchangeRateCalculator: {
      amount: 'المبلغ',
      from: 'من',
      to: 'إلى',
      swap: 'تبديل العملات',
      disclaimer: 'الأسعار مقدمة عبر واجهة برمجة تطبيقات حية، وهي للأغراض الإعلامية وقد يكون هناك تأخير.',
      error: 'فشل في جلب أسعار الصرف. يرجى المحاولة مرة أخرى في وقت لاحق.',
      apiKeyMissing: 'خدمة أسعار الصرف غير مهيأة. مفتاح API مفقود.',
      currencies: {
        USD: "الدولار الأمريكي",
        EUR: "اليورو",
        JPY: "الين الياباني",
        GBP: "الجنيه الإسترليني",
        AUD: "الدولار الأسترالي",
        CAD: "الدولار الكندي",
        CHF: "الفرنك السويسري",
        CNY: "اليوان الصيني",
        KRW: "الوون الكوري الجنوبي",
      },
      description: `
        <div dir="rtl">
        <h3>عن حاسبة أسعار الصرف</h3>
        <p>توفر هذه الأداة تحويل العملات في الوقت الفعلي بناءً على أحدث أسعار الصرف. سواء كنت تخطط لرحلة، أو تتسوق عبر الإنترنت، أو تدير الشؤون المالية الدولية، احصل على تحويلات محدثة على الفور.</p>
        <h3>كيفية الاستخدام</h3>
        <ol>
          <li>أدخل المبلغ المالي الذي تريد تحويله.</li>
          <li>اختر العملة التي تقوم بالتحويل منها.</li>
          <li>اختر العملة التي تريد التحويل إليها.</li>
          <li>سيتم حساب وعرض المبلغ المحول تلقائيًا.</li>
        </ol>
        <h3>المزايا</h3>
        <ul>
          <li><strong>بيانات حية:</strong> تستخدم واجهة برمجة تطبيقات في الوقت الفعلي لتوفير أسعار الصرف الحالية (قد يكون هناك تأخير طفيف في الأسعار).</li>
          <li><strong>سهل الاستخدام:</strong> واجهة مباشرة لتحويلات عملات سريعة وبسيطة.</li>
          <li><strong>إدخال مؤجل:</strong> ينفذ العمليات الحسابية بكفاءة بعد التوقف عن الكتابة لتجنب الطلبات المفرطة.</li>
        </ul>
        </div>
      `
    },
    percentageCalculator: {
      title: 'ما هي النسبة المئوية لعدد؟',
      of: 'من',
      result: 'النتيجة',
      description: `
        <div dir="rtl">
        <h3>عن حاسبة النسبة المئوية</h3>
        <p>أداة بسيطة وسريعة لإجراء حسابات النسبة المئوية الشائعة. سواء كنت تحسب خصمًا، أو تحدد إكرامية، أو تحل مسألة رياضية، فإن هذه الحاسبة تمنحك الإجابة على الفور.</p>
        <h3>كيفية الاستخدام</h3>
        <ol>
          <li>أدخل النسبة المئوية التي تريد حسابها في المربع الأول (على سبيل المثال، 15 لـ 15٪).</li>
          <li>أدخل الرقم الأساسي الذي تحسب النسبة المئوية منه في المربع الثاني.</li>
          <li>يتم حساب النتيجة وعرضها في الوقت الفعلي.</li>
        </ol>
        <h3>المزايا</h3>
        <ul>
          <li><strong>سريع وسهل:</strong> يحل مشاكل النسبة المئوية اليومية دون حساب يدوي.</li>
          <li><strong>نتائج فورية:</strong> لا حاجة للنقر على زر؛ يتم تحديث النتيجة أثناء الكتابة.</li>
          <li><strong>متعدد الاستخدامات:</strong> مفيد للتسوق والتمويل والطبخ والأغراض الأكاديمية.</li>
        </ul>
        </div>
      `
    },
    ageCalculator: {
      label: 'أدخل تاريخ ميلادك',
      yourAge: 'عمرك هو',
      years: 'سنوات',
      months: 'أشهر',
      days: 'أيام',
      description: `
        <div dir="rtl">
        <h3>عن حاسبة العمر</h3>
        <p>اكتشف عمرك الدقيق بالسنوات والأشهر والأيام باستخدام هذه الأداة البسيطة. ما عليك سوى إدخال تاريخ ميلادك، وستقوم الحاسبة على الفور بحساب عمرك الزمني بناءً على التاريخ الحالي.</p>
        <h3>كيفية الاستخدام</h3>
        <ol>
          <li>انقر على حقل الإدخال واختر تاريخ ميلادك من التقويم.</li>
          <li>ستعرض الحاسبة تلقائيًا عمرك الدقيق مقسمًا إلى سنوات وأشهر وأيام.</li>
        </ol>
        <h3>المزايا</h3>
        <ul>
          <li><strong>حساب دقيق:</strong> يوفر عمرًا دقيقًا، وليس فقط عدد السنوات.</li>
          <li><strong>سهل الاستخدام:</strong> يتميز بمنتقي تاريخ سهل الاستخدام للإدخال.</li>
          <li><strong>فوري:</strong> يحسب عمرك فورًا عند اختيار تاريخ.</li>
        </ul>
        </div>
      `
    },
    barcodeGenerator: {
        dataLabel: "البيانات المراد تشفيرها",
        dataPlaceholder: "أدخل نصًا أو عنوان URL",
        formatLabel: "تنسيق الباركود",
        generateButton: "إنشاء",
        downloadButton: "تنزيل",
        errorInput: "الرجاء إدخال بيانات لإنشاء باركود.",
        description: `
            <div dir="rtl">
            <h3>عن مولد الباركود</h3>
            <p>أنشئ بسهولة أنواعًا مختلفة من الباركود ورموز QR لمنتجاتك أو مناسباتك أو استخدامك الشخصي. تدعم هذه الأداة التنسيقات الشائعة مثل CODE128 و EAN-13 ورموز QR، وتحول النص أو عنوان URL الخاص بك إلى صورة قابلة للمسح الضوئي.</p>
            <h3>كيفية الاستخدام</h3>
            <ol>
                <li>أدخل البيانات (نص أو أرقام أو عنوان URL) التي تريد تشفيرها في حقل الإدخال.</li>
                <li>اختر تنسيق الباركود المطلوب من القائمة المنسدلة.</li>
                <li>انقر فوق زر "إنشاء" لرؤية معاينة الباركود.</li>
                <li>بمجرد إنشائه، انقر فوق زر "تنزيل" لحفظ الباركود كصورة PNG.</li>
            </ol>
            <h3>المزايا</h3>
            <ul>
                <li><strong>تنسيقات متعددة:</strong> تدعم مجموعة واسعة من معايير الباركود الشائعة.</li>
                <li><strong>معاينة فورية:</strong> شاهد الباركود أو رمز QR الخاص بك أثناء إنشائه.</li>
                <li><strong>قابل للتنزيل:</strong> احفظ الباركود الذي تم إنشاؤه كصور عالية الجودة للطباعة أو الاستخدام الرقمي.</li>
            </ul>
            </div>
        `
    },
    qrCodeGenerator: {
        dataLabel: "البيانات المراد تشفيرها",
        dataPlaceholder: "أدخل نصًا أو عنوان URL لرمز QR",
        downloadButton: "تنزيل رمز QR",
        errorInput: "الرجاء إدخال بيانات لإنشاء رمز QR.",
        description: `
            <div dir="rtl">
            <h3>عن مولد رمز QR</h3>
            <p>أنشئ بسرعة رمز QR من أي نص أو عنوان URL. تعد رموز QR طريقة ملائمة لمشاركة المعلومات مثل روابط مواقع الويب أو تفاصيل الاتصال أو بيانات اعتماد Wi-Fi. تنشئ هذه الأداة رمز QR عالي الجودة وقابل للمسح يمكنك تنزيله واستخدامه في أي مكان.</p>
            <h3>كيفية الاستخدام</h3>
            <ol>
                <li>أدخل النص أو عنوان URL الذي تريد تشفيره في حقل الإدخال.</li>
                <li>سيتم إنشاء رمز QR وعرضه في الوقت الفعلي.</li>
                <li>انقر فوق زر "تنزيل رمز QR" لحفظ الصورة كملف PNG.</li>
            </ol>
            <h3>المزايا</h3>
            <ul>
                <li><strong>إنشاء فوري:</strong> يتم تحديث رمز QR أثناء الكتابة للحصول على ملاحظات فورية.</li>
                <li><strong>متعدد الاستخدامات:</strong> قم بتشفير عناوين URL لمواقع الويب والنصوص العادية وأرقام الهواتف والمزيد.</li>
                <li><strong>تنزيل عالي الجودة:</strong> احفظ صورة رمز QR واضحة وعالية الدقة مناسبة للطباعة والاستخدام الرقمي.</li>
            </ul>
            </div>
        `
    },
    nicknameGenerator: {
        generateButton: "إنشاء لقب جديد",
        copyButton: "نسخ",
        copied: "تم النسخ!",
        description: `
            <div dir="rtl">
            <h3>عن مولد الألقاب</h3>
            <p>هل تواجه صعوبة في العثور على اسم مستخدم أو لقب إبداعي؟ تنشئ هذه الأداة ألقابًا فريدة وممتعة من خلال الجمع بين صفة عشوائية واسم. إنها مثالية للألعاب أو وسائل التواصل الاجتماعي أو أي منصة عبر الإنترنت.</p>
            <h3>كيفية الاستخدام</h3>
            <ol>
                <li>انقر فوق زر "إنشاء لقب جديد".</li>
                <li>سيظهر لقب عشوائي جديد في مربع العرض.</li>
                <li>استمر في النقر حتى تجد واحدًا يعجبك.</li>
                <li>انقر فوق زر "نسخ" لحفظه في حافظتك.</li>
            </ol>
            <h3>المزايا</h3>
            <ul>
                <li><strong>إمكانيات لا حصر لها:</strong> تولد عددًا هائلاً من المجموعات الفريدة.</li>
                <li><strong>بسيط وسريع:</strong> احصل على لقب جديد بنقرة واحدة.</li>
                <li><strong>ممتع وإبداعي:</strong> اكتشف ألقابًا مسلية لا تنسى لم تكن لتفكر بها.</li>
            </ul>
            </div>
        `
    },
    mealPicker: {
        title: "ماذا يجب أن آكل؟",
        pickButton: "أوصني بقائمة طعام!",
        resultPrefix: "ماذا عن",
        resultSuffix: "لهذا اليوم؟",
        description: `
            <div dir="rtl">
            <h3>عن منتقي الوجبات</h3>
            <p>لا تستطيع أن تقرر ماذا ستأكل على الغداء أو العشاء؟ دع منتقي الوجبات يتخذ القرار نيابة عنك! تقترح هذه الأداة بشكل عشوائي وجبة لذيذة من قائمة منسقة من الأطباق الشعبية، مما يساعدك على التغلب على إرهاق اتخاذ القرار.</p>
            <h3>كيفية الاستخدام</h3>
            <ol>
                <li>ما عليك سوى النقر على زر "أوصني بقائمة طعام!".</li>
                <li>ستختار الأداة بشكل عشوائي وتعرض اقتراحًا لوجبة.</li>
                <li>إذا لم يعجبك الاقتراح، فما عليك سوى النقر مرة أخرى للحصول على اقتراح آخر.</li>
            </ol>
            <h3>المزايا</h3>
            <ul>
                <li><strong>يحل التردد:</strong> طريقة سريعة وممتعة لاتخاذ قرار بشأن وجبتك التالية.</li>
                <li><strong>اكتشف أفكارًا جديدة:</strong> قد يذكرك بطبق لم تتناوله منذ فترة.</li>
                <li><strong>فوري:</strong> لا انتظار، مجرد نقرة واقتراح.</li>
            </ul>
            </div>
        `
    },
    ddayCalculator: {
        eventTitleLabel: "عنوان الحدث",
        eventTitlePlaceholder: "مثال: عيد ميلادي",
        dateLabel: "التاريخ المستهدف",
        result: "النتيجة",
        daysLeft: "أيام متبقية",
        daysPassed: "أيام مرت",
        today: "هو اليوم!",
        description: `
            <div dir="rtl">
            <h3>عن حاسبة D-Day</h3>
            <p>تتبع الأحداث القادمة المهمة أو الذكرى السنوية باستخدام حاسبة D-Day. حدد تاريخًا مستهدفًا وشاهد عدد الأيام المتبقية، أو احسب عدد الأيام التي مرت منذ حدث مهم.</p>
            <h3>كيفية الاستخدام</h3>
            <ol>
                <li>أدخل عنوانًا لحدثك (على سبيل المثال، "إجازة" أو "الموعد النهائي للمشروع").</li>
                <li>اختر التاريخ المستهدف من التقويم.</li>
                <li>ستعرض لك الحاسبة على الفور العد التنازلي (D-) أو العد التصاعدي (D+) بالأيام.</li>
            </ol>
            <h3>المزايا</h3>
            <ul>
                <li><strong>ابق منظمًا:</strong> لا تفقد أبدًا تواريخ مهمة مثل الامتحانات أو الإجازات أو المواعيد النهائية.</li>
                <li><strong>تصور سهل:</strong> يعرض بوضوح عدد الأيام المتبقية أو التي انقضت.</li>
                <li><strong>متعدد الاستخدامات:</strong> مفيد لكل من الأحداث المستقبلية والمعالم الماضية.</li>
            </ul>
            </div>
        `
    },
    cagrCalculator: {
        startValueLabel: "القيمة الأولية",
        endValueLabel: "القيمة النهائية",
        yearsLabel: "عدد السنوات",
        calculateButton: "حساب CAGR",
        resultTitle: "معدل النمو السنوي المركب (CAGR)",
        description: `
            <div dir="rtl">
            <h3>عن حاسبة CAGR</h3>
            <p>حاسبة معدل النمو السنوي المركب (CAGR) هي أداة مالية تقيس معدل النمو السنوي للاستثمار على مدى فترة محددة. إنها توفر معدل عائد سلس، بافتراض أن الاستثمار قد نما بمعدل ثابت كل عام.</p>
            <h3>كيفية الاستخدام</h3>
            <ol>
                <li>أدخل القيمة الأولية للاستثمار في حقل "القيمة الأولية".</li>
                <li>أدخل القيمة النهائية في حقل "القيمة النهائية".</li>
                <li>أدخل المدة الإجمالية للاستثمار بالسنوات.</li>
                <li>انقر فوق "حساب CAGR" لرؤية النتيجة.</li>
            </ol>
            <h3>المزايا</h3>
            <ul>
                <li><strong>مقياس موحد:</strong> يوفر مقياسًا واضحًا ومقبولًا على نطاق واسع لمقارنة أداء الاستثمار.</li>
                <li><strong>سهل الاستخدام:</strong> يتم إجراء العمليات الحسابية المالية المعقدة نيابة عنك على الفور.</li>
                <li><strong>غني بالمعلومات:</strong> يساعد في فهم النمو الحقيقي للاستثمار بمرور الوقت.</li>
            </ul>
            </div>
        `
    },
    unitConverter: {
        categoryLabel: "الفئة",
        fromLabel: "من",
        toLabel: "إلى",
        categories: {
            length: "الطول",
            weight: "الوزن",
            temperature: "درجة الحرارة",
        },
        units: {
            m: "متر (م)",
            km: "كيلومتر (كم)",
            cm: "سنتيمتر (سم)",
            mm: "مليمتر (مم)",
            mi: "ميل (ميل)",
            yd: "ياردة (ياردة)",
            ft: "قدم (قدم)",
            in: "بوصة (بوصة)",
            kg: "كيلوغرام (كجم)",
            g: "غرام (جم)",
            mg: "مليغرام (مجم)",
            lb: "رطل (رطل)",
            oz: "أونصة (أوقية)",
            c: "مئوية (°م)",
            f: "فهرنهايت (°ف)",
            k: "كلفن (ك)",
        },
        description: `
            <div dir="rtl">
            <h3>عن محول الوحدات</h3>
            <p>أداة متعددة الاستخدامات وضرورية للتحويل بين وحدات القياس المختلفة. سواء كنت بحاجة إلى تحويل الطول أو الوزن أو درجة الحرارة، يوفر هذا المحول نتائج سريعة ودقيقة للطلاب والمهنيين والاستخدام اليومي.</p>
            <h3>كيفية الاستخدام</h3>
            <ol>
                <li>اختر فئة القياس (على سبيل المثال، الطول).</li>
                <li>أدخل القيمة التي ترغب في تحويلها في حقل الإدخال.</li>
                <li>اختر الوحدة التي تقوم بالتحويل منها.</li>
                <li>اختر الوحدة التي تريد التحويل إليها.</li>
                <li>يتم عرض النتيجة المحولة على الفور.</li>
            </ol>
            <h3>المزايا</h3>
            <ul>
                <li><strong>شامل:</strong> يغطي الوحدات الشائعة للطول والوزن ودرجة الحرارة.</li>
                <li><strong>نتائج في الوقت الفعلي:</strong> يتم تحديث التحويلات تلقائيًا أثناء الكتابة أو تغيير الوحدات.</li>
                <li><strong>سهل الاستخدام:</strong> واجهة نظيفة وبديهية تجعل التحويلات سريعة وسهلة.</li>
            </ul>
            </div>
        `
    },
    loanCalculator: {
        amountLabel: "مبلغ القرض",
        rateLabel: "سعر الفائدة السنوي (٪)",
        termLabel: "مدة القرض (سنوات)",
        calculateButton: "احسب",
        resultsTitle: "ملخص القرض",
        monthlyPayment: "القسط الشهري",
        totalInterest: "إجمالي الفائدة المدفوعة",
        totalRepayment: "إجمالي السداد",
        description: `
            <div dir="rtl">
            <h3>عن حاسبة القروض</h3>
            <p>تساعدك هذه الأداة على فهم الآثار المالية المترتبة على القرض. عن طريق إدخال مبلغ القرض وسعر الفائدة والمدة، يمكنك حساب أقساطك الشهرية المقدرة، وإجمالي الفائدة التي ستدفعها على مدى عمر القرض، والمبلغ الإجمالي الذي ستسدده.</p>
            <h3>كيفية الاستخدام</h3>
            <ol>
                <li>أدخل إجمالي مبلغ القرض الذي ترغب في اقتراضه.</li>
                <li>أدخل سعر الفائدة السنوي للقرض.</li>
                <li>حدد مدة القرض بالسنوات.</li>
                <li>انقر فوق زر "احسب" لرؤية ملخص مفصل لقرضك.</li>
            </ol>
            <h3>المزايا</h3>
            <ul>
                <li><strong>التخطيط المالي:</strong> يساعدك على وضع الميزانية بفعالية من خلال معرفة التزامات الدفع الشهرية.</li>
                <li><strong>قرارات مستنيرة:</strong> فهم التكلفة الحقيقية للقرض قبل الالتزام به.</li>
                <li><strong>سهل الاستخدام:</strong> يبسط حسابات القروض المعقدة في بضع خطوات بسيطة.</li>
            </ul>
            </div>
        `
    },
    about: {
        title: "حول ToolVerse",
        content: `<div dir="rtl"><h3>حول ToolVerse</h3><p>ToolVerse هي مجموعة أدوات ويب متعددة اللغات ومتنوعة مصممة لتوفير مجموعة من الأدوات المساعدة للمهام اليومية. هدفنا هو تقديم أدوات بسيطة وقوية ومتاحة لجمهور عالمي.</p><h4>أدواتنا</h4><p>مجموعتنا الحالية من الأدوات تشمل:</p><ul><li><strong>ملخص النصوص:</strong> تكثيف المقالات والنصوص الطويلة إلى ملخصات موجزة باستخدام الذكاء الاصطناعي.</li><li><strong>مولد الصور:</strong> إنشاء صور فريدة من الأوصاف النصية.</li><li><strong>منسق JSON:</strong> التحقق من صحة بيانات JSON وتنسيقها بسهولة.</li><li><strong>محول الألوان:</strong> تحويل الألوان بين تنسيقات HEX و RGB و HSL.</li><li><strong>مولد كلمات المرور:</strong> إنشاء كلمات مرور قوية وآمنة وقابلة للتخصيص.</li></ul><h4>تقنيتنا</h4><p>بعض ميزاتنا المتقدمة، مثل ملخص النصوص ومولد الصور، مدعومة بواجهة برمجة تطبيقات Gemini من Google، مما يوفر إمكانات ذكاء اصطناعي حديثة.</p><h4>اتصل بنا</h4><p>نرحب بملاحظاتكم واقتراحاتكم! إذا كان لديك أي أسئلة أو تعليقات أو استفسارات، فلا تتردد في التواصل معنا على: <a href="mailto:toolverse123@gmail.com" class="text-cyan-400 hover:underline">toolverse123@gmail.com</a>.</p></div>`
    },
    termsofservice: {
        title: "شروط الخدمة",
        content: `<div dir="rtl"><h3>شروط خدمة ToolVerse</h3><p><strong>آخر تحديث: 2024-05-20</strong></p><p>أهلاً بك في ToolVerse! تحدد هذه الشروط والأحكام القواعد واللوائح الخاصة باستخدام موقعنا.</p><h4>1. قبول الشروط</h4><p>من خلال الوصول إلى هذا الموقع، نفترض أنك تقبل هذه الشروط والأحكام. لا تواصل استخدام ToolVerse إذا كنت لا توافق على جميع الشروط والأحكام المذكورة في هذه الصفحة.</p><h4>2. استخدام الأدوات</h4><p>يوفر ToolVerse مجموعة متنوعة من الأدوات المساعدة عبر الإنترنت. أنت توافق على استخدام هذه الأدوات لأغراضها المقصودة وبطريقة قانونية. أنت مسؤول عن أي بيانات تدخلها في أدواتنا.</p><p>يجب ألا تدخل أي معلومات شخصية حساسة (مثل أرقام الضمان الاجتماعي، المعلومات المالية، السجلات الصحية) في أي من الأدوات المتوفرة على هذا الموقع.</p><h4>3. الأدوات المدعومة بالذكاء الاصطناعي</h4><p>يستخدم ملخص النصوص ومولد الصور لدينا واجهة برمجة تطبيقات Google Gemini. باستخدام هذه الأدوات، فإنك توافق على إرسال البيانات التي تقدمها (نص أو مطالبات) إلى Google لمعالجتها. تحتفظ بملكية المحتوى الأصلي الخاص بك، لكنك تمنحنا ومقدمي الخدمات من الأطراف الثالثة ترخيصًا لاستخدام المحتوى لتقديم الخدمة.</p><p>الناتج الذي تولده هذه الأدوات مخصص للأغراض الإعلامية فقط. نحن لا نضمن دقة أو اكتمال أو موثوقية المحتوى الذي تم إنشاؤه.</p><h4>4. إخلاء المسؤولية عن الضمانات</h4><p>يتم توفير الخدمات على ToolVerse "كما هي". نحن لا نقدم أي ضمانات، صريحة أو ضمنية، ونخلي مسؤوليتنا بموجب هذا عن جميع الضمانات الأخرى بما في ذلك، على سبيل المثال لا الحصر، الضمانات الضمنية أو شروط القابلية للتسويق أو الملاءمة لغرض معين أو عدم انتهاك الملكية الفكرية أو أي انتهاك آخر للحقوق.</p><h4>5. تحديد المسؤولية</h4><p>لن يكون ToolVerse أو موردوه مسؤولين بأي حال من الأحوال عن أي أضرار (بما في ذلك، على سبيل المثال لا الحصر، الأضرار الناجمة عن فقدان البيانات أو الربح، أو بسبب انقطاع الأعمال) تنشأ عن استخدام أو عدم القدرة على استخدام المواد الموجودة على موقع ToolVerse.</p><h4>6. تغيير الشروط</h4><p>نحتفظ بالحق في مراجعة شروط الخدمة هذه في أي وقت دون إشعار. باستخدام هذا الموقع، فإنك توافق على الالتزام بالإصدار الحالي من شروط الخدمة هذه.</p></div>`
    },
    privacypolicy: {
        title: "سياسة الخصوصية",
        content: `<div dir="rtl"><h3>سياسة خصوصية ToolVerse</h3><p><strong>آخر تحديث: 2024-05-20</strong></p><p>تصف سياسة الخصوصية هذه كيفية التعامل مع معلوماتك عند استخدامك لـ ToolVerse.</p><h4>1. المعلومات التي نجمعها</h4><p>نهدف إلى جمع أقل قدر ممكن من المعلومات. البيانات التي تقدمها (مثل نص التلخيص) تستخدم فقط لتشغيل الأداة المحددة التي تستخدمها.</p><h4>2. كيف نستخدم المعلومات</h4><ul><li><strong>أدوات الذكاء الاصطناعي:</strong> يتم إرسال النصوص والمطالبات إلى واجهة برمجة تطبيقات Google Gemini لمعالجتها. نحن لا نخزن مدخلاتك أو مخرجاتك. يرجى الرجوع إلى سياسة خصوصية Google لمعرفة ممارسات التعامل مع البيانات الخاصة بهم.</li><li><strong>الأدوات من جانب العميل:</strong> تعمل الأدوات الأخرى مثل منسق JSON ومولد كلمات المرور بالكامل في متصفحك. لا يتم إرسال هذه البيانات إلى خوادمنا.</li></ul><h4>3. ملفات تعريف الارتباط (الكوكيز)</h4><p>نحن لا نستخدم ملفات تعريف الارتباط للتتبع. قد نستخدم التخزين المحلي لحفظ التفضيلات مثل اختيار اللغة، والتي يتم تخزينها على جهازك فقط.</p><h4>4. خدمات الطرف الثالث</h4><p>يخضع استخدامك للميزات المدعومة بواجهة برمجة تطبيقات Google Gemini لشروط وسياسات خصوصية Google.</p><h4>5. اتصل بنا</h4><p>إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك الاتصال بنا على: <a href="mailto:toolverse123@gmail.com" class="text-cyan-400 hover:underline">toolverse123@gmail.com</a>.</p></div>`
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