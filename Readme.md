# middleman-bootstrap-definitive

This template is the best for using Middleman and Bootstrap together. It bakes in a custom Bootstrap install (based on the SASS port of Bootstrap) using Bower, proxies the font directory for Glyphicons, and copies font files over at build.

The template loads Font Awesome off of the BootstrapCDN, but if installed locally with Bower, will include it and the font files in the build, so your project can rely (or not) on CDNs.

## Installing

Run `bundle install` to install Ruby gems. Run `bower install` to install Bower components.

## Customizing Bootstrap

Edit the `_boostrap.scss` file to include or exclude Bootstrap CSS components in your application. 

Edit the `_variables.scss` file to customize Bootstrap variables for your local application.

Edit the `bootstrap.js` file to include or exclude Bootstrap JS components in your application.