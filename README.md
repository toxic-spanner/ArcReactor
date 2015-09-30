# ArcReactor
An all-purpose library for MCA.

Includes the following components:

 - Blocks (IDs, operations)
 - Items (IDs, operations)
 - Commands (command generators)
 - Control structures (branch based IF, WHILE, FOR, etc)
 - World (higher level world operations and abstractions)

## Usage

Place the `ArcReactor` folder inside a `mca_modules` folder in your project root.

Include the entire library with:

```mca
import "ArcReactor";
```

Or include one part of the library with:

```mca
import "ArcReactor/<component name>";
```

where `<component name>` is `blocks`, `items`, `commands`, `control`, or `world`.