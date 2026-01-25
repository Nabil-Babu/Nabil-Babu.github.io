class TypeWriter {
    constructor(element, fullText, options = {}) {
        this.element = element;              // p5.Element container
        this.fullText = fullText;            // Complete string to type
        this.currentIndex = 0;               // Current character position
        this.isComplete = false;

        // Configurable options with defaults
        this.minDelay = options.minDelay || 30;
        this.maxDelay = options.maxDelay || 100;
        this.startDelay = options.startDelay || 0;
        this.onComplete = options.onComplete || null;
        this.hideCursorOnComplete = options.hideCursorOnComplete || false;

        this.cursorElement = null;
        this.typingTimer = null;
    }

    setupCursor() {
        // Create blinking cursor span
        let cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        cursorSpan.textContent = '|';
        this.element.elt.appendChild(cursorSpan);
        this.cursorElement = cursorSpan;
    }

    start() {
        this.stop();  // Cancel any existing animation
        this.element.html('');
        this.currentIndex = 0;
        this.isComplete = false;

        this.setupCursor();

        setTimeout(() => {
            this.typeNextCharacter();
        }, this.startDelay);
    }

    typeNextCharacter() {
        // Validate element still exists
        if (!this.element.elt || !document.body.contains(this.element.elt)) {
            this.stop();
            return;
        }

        if (this.currentIndex < this.fullText.length) {
            let char = this.fullText[this.currentIndex];

            // Update text content
            let currentText = this.fullText.substring(0, this.currentIndex + 1);

            // Find existing text node or create new one
            let textNode = this.element.elt.childNodes[0];
            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                // Update existing text node
                textNode.textContent = currentText;
            } else {
                // Create new text node and insert before cursor
                let newTextNode = document.createTextNode(currentText);
                this.element.elt.insertBefore(newTextNode, this.cursorElement);
            }

            this.currentIndex++;

            // Variable delay: 40-90ms base + 100ms after punctuation
            let delay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
            if (['.', '!', '?', ','].includes(char)) {
                delay += 100;
            }

            this.typingTimer = setTimeout(() => {
                this.typeNextCharacter();
            }, delay);
        } else {
            // Typing complete
            this.isComplete = true;

            // Hide cursor if option is set
            if (this.hideCursorOnComplete && this.cursorElement) {
                this.cursorElement.style.display = 'none';
            }

            if (this.onComplete) {
                this.onComplete();
            }
        }
    }

    stop() {
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
            this.typingTimer = null;
        }
    }

    reset() {
        this.stop();
        this.currentIndex = 0;
        this.isComplete = false;
        this.element.html('');
    }
}
