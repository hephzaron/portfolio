import { Component } from "react";
import { ArrowUp } from "lucide-react";

/**
 * @class Footer
 * @classdesc Website footer with copyright information and
 * a scroll-to-top link button.
 */
class FooterBase extends Component {
  /**
   * Render the copyright text.
   *
   * @returns {JSX.Element}
   */
  renderCopyright() {
    return (
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Pedrotech.co. All rights reserved.
      </p>
    );
  }

  /**
   * Render the scroll-to-top button.
   *
   * @returns {JSX.Element}
   */
  renderScrollTop() {
    return (
      <a
        href="#hero"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <ArrowUp size={20} />
      </a>
    );
  }

  /**
   * Main render method for Footer.
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
        {this.renderCopyright()}
        {this.renderScrollTop()}
      </footer>
    );
  }
}

export const Footer = FooterBase;
