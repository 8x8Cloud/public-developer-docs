# Lowercase Operation IDs Script

## Purpose

This script converts all `operationId` values in OpenAPI specification (OAS) YAML and JSON files to lowercase. This ensures consistency with Docusaurus naming conventions and helps maintain uniform URL slugs for API documentation pages.

## When to Use

Use this script when:
- Adding new OpenAPI specification files (YAML or JSON) to the `docs_oas/` directory
- Updating existing OAS files that contain mixed-case or uppercase `operationId` values
- Preparing OAS files for Docusaurus OpenAPI plugin processing

## Usage

The script supports three modes of operation:

### 1. Process All Files (Default)
When run without arguments, processes all YAML and JSON files in the `docs_oas/` directory recursively:

```bash
yarn lowercase-operationids
```

This is the recommended approach when working with multiple OAS files.

### 2. Process Single File
Convert operation IDs in a specific YAML or JSON file:

```bash
yarn lowercase-operationids <path-to-file>
```

**Examples:**
```bash
# YAML file
yarn lowercase-operationids docs_oas/actions-events/Dynamic_campaigns.yaml

# JSON file
yarn lowercase-operationids docs_oas/actions-events/fax_as_a_service_(faas)_api.json
```

### 3. Process Directory
Convert operation IDs in all YAML and JSON files within a specific directory:

```bash
yarn lowercase-operationids <path-to-directory>
```

**Example:**
```bash
yarn lowercase-operationids docs_oas/actions-events
```

## What It Does

The script performs the following operations:

1. **Detects file type** - Determines if the file is YAML (.yaml/.yml) or JSON (.json)
2. **Reads the file** - Loads the entire OpenAPI specification file as text
3. **Finds all operationId fields** - Uses regex patterns to locate every `operationId` declaration
4. **Converts to lowercase** - Transforms the value to lowercase
5. **Shows changes** - Displays a summary of all modifications
6. **Updates the file** - Writes the modified content back to the original file, preserving formatting

### Pattern Matching

The script uses different regex patterns for YAML and JSON files:

**YAML Pattern** - Handles both quoted and unquoted values:

```yaml
# Unquoted
operationId: AddCustomer  # → addcustomer

# Single-quoted
operationId: 'GetCustomerInfo'  # → 'getcustomerinfo'

# Double-quoted
operationId: "DeleteCustomer"  # → "deletecustomer"
```

**JSON Pattern** - Handles standard JSON format:

```json
{
  "operationId": "GetCustomerWebhooks"  // → "getcustomerwebhooks"
}
```

## Output Examples

### Single File Mode (YAML)

```
Processing file: docs_oas/actions-events/Dynamic_campaigns.yaml

Found 2 operationId(s) to convert:

1. AddCustomer → addcustomer
2. ChangeCampaignStatus → changecampaignstatus

✓ Successfully updated docs_oas/actions-events/Dynamic_campaigns.yaml
✓ Converted 2 operationId(s) to lowercase
```

### Single File Mode (JSON)

```
Processing file: docs_oas/actions-events/fax_as_a_service_(faas)_api.json

Found 26 operationId(s) to convert:

1. getCustomerWebhooks → getcustomerwebhooks
2. createCustomerWebhook → createcustomerwebhook
3. getCustomerDidFaxEventsWebhooks → getcustomerdidfaxeventswebhooks
...

✓ Successfully updated docs_oas/actions-events/fax_as_a_service_(faas)_api.json
✓ Converted 26 operationId(s) to lowercase
```

### Directory Mode

```
Processing directory: /path/to/docs_oas

Found 17 YAML/JSON file(s)

Files with changes:

📄 actions-events/8x8_contact_center_chat_api_v2.json
   Found 20 operationId(s) to convert:
   • createAccessToken → createaccesstoken
   • getWebHooks → getwebhooks
   • createWebHook → createwebhook
   ...

📄 actions-events/Dynamic_campaigns.yaml
   Found 3 operationId(s) to convert:
   • changeCampaignStatus → changecampaignstatus
   • addCustomer → addcustomer
   • deleteCustomer → deletecustomer

📄 actions-events/fax_as_a_service_(faas)_api.json
   Found 26 operationId(s) to convert:
   • getCustomerWebhooks → getcustomerwebhooks
   • createCustomerWebhook → createcustomerwebhook
   ...

════════════════════════════════════════════════════════════
✓ Successfully processed 17 file(s)
✓ Updated 8 file(s)
✓ Converted 128 operationId(s) to lowercase
```

### No Changes Needed

If no changes are needed:
```
Processing file: docs_oas/actions-events/some-file.yaml

✓ No changes needed - all operationId values are already lowercase
```

## Important Notes

- **Default Behavior**: Without arguments, processes all YAML and JSON files in `docs_oas/` directory recursively
- **File Formats**: Processes `.yaml`, `.yml`, and `.json` files
- **In-Place Modification**: Original files are modified directly (no backup is created)
- **Case Sensitivity**: Only converts `operationId` - other fields remain unchanged
- **Preserves Structure**: File structure, formatting, indentation, and comments (in YAML) are preserved
- **Recursive Processing**: When given a directory, processes all subdirectories
- **Format Preservation**: Both YAML and JSON files maintain their original formatting style

## Error Handling

The script validates:
- ✅ Path exists (uses default `docs_oas/` if no argument provided)
- ✅ Path is a valid file or directory
- ✅ Files have `.yaml`, `.yml`, or `.json` extension (in single-file mode)
- ✅ At least one YAML/JSON file exists (in directory mode)

## Integration with Docusaurus

Lowercase operation IDs are important for Docusaurus because:

1. **URL Slugs**: Operation IDs become part of the documentation URL
2. **Consistency**: Lowercase URLs follow web conventions
3. **Sidebar References**: The sidebar configuration references these IDs
4. **Link Stability**: Consistent casing prevents broken links

## Workflow

### Recommended Workflow for Multiple Files

When adding or updating multiple OAS files:

1. Add or update YAML files in `docs_oas/`
2. Run the lowercase script (processes all files):
   ```bash
   yarn lowercase-operationids
   ```
3. Review the changes in the output
4. Update sidebar configuration if needed
5. Build the documentation:
   ```bash
   yarn build
   ```

### Workflow for Single File

When working with a single OAS file:

1. Add or update the YAML file in `docs_oas/`
2. Run the lowercase script on that file:
   ```bash
   yarn lowercase-operationids docs_oas/path/to/file.yaml
   ```
3. Verify the changes in the output
4. Update sidebar configuration if needed
5. Build the documentation:
   ```bash
   yarn build
   ```

### Best Practice

It's recommended to run `yarn lowercase-operationids` (without arguments) periodically to ensure all OAS files maintain consistent lowercase operation IDs, especially:
- Before committing changes to the repository
- After bulk updates to OAS files
- When onboarding new API documentation

## Technical Details

**Script Location**: `scripts/lowercase-operation-ids.js`

**Package Script**: Defined in `package.json` as `lowercase-operationids`

**Dependencies**: None (uses only Node.js built-in modules: `fs`, `path`)

**Default Directory**: `/Users/pcomanici/work/github/8x8/developer-docs/docs_oas`

### Core Functions

1. **`findOpenApiFiles(dir)`**: Recursively traverses directories to find all `.yaml`, `.yml`, and `.json` files
2. **`processFile(filePath)`**: Dispatcher that detects file type and calls appropriate processor
3. **`processYamlFile(yamlFilePath)`**: Processes YAML files using regex pattern matching
4. **`processJsonFile(jsonFilePath)`**: Processes JSON files using regex pattern matching
5. **Main logic**: Determines mode (directory/file) and processes accordingly

### Operation Modes

The script detects the target type using `fs.statSync()`:
- **Directory**: Calls `findOpenApiFiles()` to get all YAML/JSON files recursively
- **File**: Calls `processFile()` which delegates to the appropriate processor
- **No argument**: Uses `DEFAULT_DIR` constant

### Regex Patterns

**YAML Pattern**:
```javascript
/^(\s*operationId:\s*)(['"]?)([^\s'"]+)(['"]?)$/gm
```

This pattern matches:
- Line start with optional whitespace
- The literal text `operationId:`
- Optional whitespace
- Optional opening quote (single or double)
- The operation ID value (non-whitespace, non-quote characters)
- Optional closing quote
- Line end

**JSON Pattern**:
```javascript
/"operationId"\s*:\s*"([^"]+)"/g
```

This pattern matches:
- The literal text `"operationId"`
- Optional whitespace
- Colon
- Optional whitespace
- Opening double quote
- The operation ID value (any characters except double quote)
- Closing double quote

### Performance

- Processes files sequentially to provide clear progress output
- Each file is read and written only once
- No external dependencies means fast startup time
- Recursive directory traversal handles arbitrarily deep folder structures
- Format-preserving regex approach maintains original file structure
