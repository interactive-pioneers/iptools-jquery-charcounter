# iptools-jquery-charcounter [![Build Status](http://img.shields.io/travis/interactive-pioneers/iptools-jquery-charcounter.svg)](https://travis-ci.org/interactive-pioneers/iptools-jquery-charcounter)

jQuery textarea character count / limit plugin

## Features
Displays the remaining characters and limits input to a maximum length.

## Requirements

- jQuery >=1.11.3 <4.0.0

## Example

```html
<textarea data-max-length="999"></textarea>

<script src="src/iptools-jquery-charcounter.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    $('textarea').iptCharCounter({
      // options
    });
  });
</script>

```

## Licence
Copyright © 2015-2017 Interactive Pioneers GmbH. Licenced under [GPL-3](LICENSE).
