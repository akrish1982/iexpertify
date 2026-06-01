To test and interact with your Amazon Bedrock AgentCore Runtime directly from the PowerShell command line, you will need to utilize the AWS CLI inside PowerShell.

While AWS provides native PowerShell Cmdlets (`AWS.Tools.BedrockAgentRuntime`), Bedrock's runtime operations stream chunks of data back in real-time, which the AWS CLI handles much more elegantly out-of-the-box via its `invoke-agent-runtime` command.

Here is the exact way to construct and execute the test from your PowerShell terminal.

---

### Step 1: Prepare Your PowerShell Variables

First, define your parameters as variables. This keeps your execution command clean and reusable.

```powershell
# Define your AgentCore ARN and session details
$AgentCoreArn = "arn:aws:bedrock:us-east-1:123456789012:agent-runtime/YOUR_AGENT_CORE_ID"
$SessionId    = "ps-test-session-$(Get-Random)"  # Generates a random session ID
$OutputFile   = "agent_response.json"

# Define the user prompt/payload as a JSON string
$Payload = @{
    inputText = "Hello! Can you confirm you are online and working?"
} | ConvertTo-Json -Compress

```

### Step 2: Run the Invoke Command

The Bedrock AgentCore runtime uses the `invoke-agent-runtime` API. Because it is a streaming/blob operation, the AWS CLI requires an `--outfile` parameter where it will write the resulting data stream.

Run the following block in your PowerShell terminal:

```powershell
aws bedrock-agentcore invoke-agent-runtime `
    --agent-runtime-arn $AgentCoreArn `
    --runtime-session-id $SessionId `
    --content-type "application/json" `
    --accept "application/json" `
    --payload $Payload `
    $OutputFile

```

> **Note on Backticks (` `):** The backtick character at the end of the lines is PowerShell's line-continuation character, allowing you to split a long command across multiple lines.

### Step 3: View the Output

Once the command completes successfully, the raw response will be saved into the `$OutputFile` (`agent_response.json`). You can read and format the JSON output directly in PowerShell using:

```powershell
Get-Content $OutputFile | ConvertTo-Json -Depth 5

```

---

### Troubleshooting Common Issues

* **Region Issues:** If your AgentCore is deployed in a specific region (e.g., `us-east-1`), ensure your CLI is pointing to it by appending `--region us-east-1` to the command, or verifying your default configuration.
* **Permissions:** Ensure the IAM identity running the PowerShell session has `bedrock-agentcore:InvokeAgentRuntime` permissions granted on that specific ARN.