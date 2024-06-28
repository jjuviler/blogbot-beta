<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- CDN includes -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.15.1/beautify-html.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@200&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@200;400&display=swap" rel="stylesheet">

    <!-- JS includes -->
    <script src="frontend.js"></script>
    <script src="process_html.js"></script>
    <script src="toc.js"></script>
    <script src="snippets.js"></script>
    <script src="images.js"></script>
    <script src="import.js"></script>

    <!-- style sheets -->
    <link rel="stylesheet" href="style.css">

    <!-- Google analytics tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VXTB4NQ2K3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-VXTB4NQ2K3');
    </script>

</head>
<body>
    <div class="main-content">
        <div class="column">
            <div class="container">
                <h1>Blogbot <span id="versionNumber">V4</span></h1>
                <form>
                    <div>
                        <input type="text" id="primaryKeyword" name="primaryKeyword" placeholder="primary keyword">
                    </div>
                    <div id="checkboxes">
                        <input type="checkbox" id="addTOC">
                        <label for="addTOC">Add TOC</label>
                        <input type="checkbox" id="addEditorsNote">
                        <label for="addEditorsNote">Add editor's note</label>
                        <select id="monthSelect" disabled>
                            <option>January</option><option>February</option><option>March</option>
                            <option>April</option><option>May</option><option>June</option>
                            <option>July</option><option>August</option><option>September</option>
                            <option>October</option><option>November</option><option>December</option>
                        </select>
                        <select id="yearSelect" disabled>
                            <option>2024</option><option>2023</option><option>2022</option>
                            <option>2021</option><option>2020</option><option>2019</option>
                            <option>2018</option><option>2017</option><option>2016</option>
                        </select>
                    </div>
                    <p id="advanced-options-toggle">Advanced options <span class="arrow">▼</span></p>
                    <div id="advanced-options-content" style="display: none;">
                        <form>
                            <input type="checkbox" id="checkbox-1" name="checkbox-1" checked>
                            <label for="checkbox-1">Add a "read more" tag </label>
                            <span class="tooltip">ⓘ<span class="tooltiptext">Blogbot adds the "more" tag after the first paragraph in the body text.</span></span><br>
                            <input type="checkbox" id="checkbox-2" name="checkbox-2" checked>
                            <label for="checkbox-2">Set links to open in a new tab </label>
                            <span class="tooltip">ⓘ<span class="tooltiptext">Blogbot makes all links in the body text (besides anchor links) to open in a new tab, and also adds the rel="noopener" attribute to these links.</span></span><br>
                            <input type="checkbox" id="checkbox-3" name="checkbox-3" checked>
                            <label for="checkbox-3">Convert straight quotes to smart quotes </label>
                            <span class="tooltip">ⓘ<span class="tooltiptext">Blogbot converts straight quotes to smart ("curly") quotes.</span></span><br>
                            <input type="checkbox" id="checkbox-4" name="checkbox-4" checked>
                            <label for="checkbox-4">Format images </label>
                            <span class="tooltip">ⓘ<span class="tooltiptext">Blogbot applies formatting to all images in the post body. Horizontal rectangular images are 650px wide. Square and vertically rectangular images are 450px wide. All images are centered.</span></span><br>
                            <input type="checkbox" id="checkbox-5" name="checkbox-5" checked>
                            <label for="checkbox-5">Format "Image Source" links </label>
                            <span class="tooltip">ⓘ<span class="tooltiptext">Blogbot applies formatting to all "Image Source" links: centered, 12px, italicized, both words capitalized.</span></span><br>
                            <input type="checkbox" id="checkbox-6" name="checkbox-6" checked>
                            <label for="checkbox-6">Remove "IMG name:" or "Image name:" under images </label>
                            <span class="tooltip">ⓘ<span class="tooltiptext">If there is an image name written underneath an image (starting with "IMG name:" or "Image name:", case-insensitive), Blogbot removes this line of text from the post body.</span></span><br>
                            <button id="selectAll">Select All</button>
                            <button id="deselectAll">Deselect All</button>
                        </form>
                    </div>
                    <div id="drop-area">
                        <p>Drag and drop your ZIP file here or <label for="fileElem" id="file-upload-label">browse</label> for a file.</p>
                        <input type="file" id="fileElem" style="display:none;" accept=".zip">
                    </div>
                    <button id="copyHtmlButton" onclick="copyHTML()">Copy HTML</button><br>
                    <textarea id="fileContents" style="width:500px; height:200px;"></textarea>
                </form>
            </div>
        </div>
        <div class="column">
            <div class="container">
                <h1>Upload Checklist</h1>
                <button id="copyChecklistButton" onclick="copyChecklist()">Copy checklist</button>
                <button id="refreshChecklistButton" onclick="refreshChecklist()">Refresh checklist</button>
                <textarea id="checklist" style="width:500px; height:500px;"></textarea>
            </div>
        </div>
    </div>
    <div class="container" id="instructions">
        <h1>Blogbot Instructions</h1>
        <button id="uploadInstructionsButton">Full Upload instructions</button>
        <h3>In your Google Doc:</h3>
        <ol>
            <li>Below each image, insert the text “[alt]” followed by the image’s alt text.</li>
            <li>For each externally sourced image, add the URL of the image source to the Google Doc below the image alt text. Blogbot will convert this URL into an “Image Source” hyperlink.</li>
            <li>For any H2s in the post that you want to make featured snippets, add “[fs]” to the H2 text. Blogbot will detect which kind of snippet to use and convert this H2 and the contents below it to a featured snippet module.</li>
            <li>Select File > Download > Web Page (.html, zipped). Once the zip file is downloaded, drag it to your desktop.</li>
        </ol>
        <h3>In Blogbot:</h3>
        <ol>
            <li>Write the primary keyword (not the focus keyword) of the post in the text box labeled primary keyword.</li>
            <li>If you want to add a table of contents to the post, check the Add TOC box.</li>
            <li>(Updates only) If the post does not already include an editor’s note at the end of the post, check the Add editor’s note box and select the month and year when the post was first published.</li>
            <li>Drag the downloaded zip file into Blogbot where indicated. If the Potential issues window appears, fix these issues in your Google Doc.</li>
            <li>Blogbot will create another zip file called compressed_images. Download this zip file to your desktop and unzip it.</li>
            <li>Upload all images in the compressed image folder to 53’s file manager (Select the text area, click the Insert image icon in the top right, click Upload, then choose all WebP images on your computer).</li>
            <li>In Blogbot, click Copy HTML to copy the cleaned HTML code.</li>
            <li>In the blog post editor, select the text area (where it says Click to add text), then click Advanced (in the top right) &gt; Source code.</li>
            <li>Paste the copied HTML code into the source code window (if there is already code in the window, replace it with the new code), then click Save changes at the bottom of the source code editor. You should see the blog post editor populate with your post content and images.</li>
        </ol>   
    </div>
    <div id="feedbackPrompt">
        <p>Feedback? Slack @jjuviler or use this <a href="https://forms.gle/d7oeBhL2KNVbRnJQ9" target="_blank">anonymous survey</a>.</p>
    </div>
    <div id="issueBox">
        <div id="closeButton">X</div>
        <h2>Potential issues:</h2>
        <p id="issueText"></p>
    </div>

</body>
</html>
