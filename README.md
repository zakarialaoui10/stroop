# stroop

**The Stroop Effect** is a psychological phenomenon where it takes longer to name the color of the ink of a word when the word itself denotes a different color. This test measures cognitive interference and reaction time.

## 📘 Terminology

<dl>
  <dt>Stimulu :</dt>
  <dd>A single trial showing a word in a certain ink color.</dd>

  <dt>Ink :</dt>
  <dd>The actual color of the text (this is what the user must identify in classical stroop test).</dd>

  <dt>Congruent :</dt>
  <dd>Word and ink match (e.g., “red” written in red)</dd>

  <dt>Incongruent :</dt>
  <dd>Word and ink do not match (e.g., “red” written in blue).</dd>

  <dt>Reaction Time :</dt>
  <dd>Time taken by the participant to respond.</dd>
</dl>


## Configuration Parameters

|Key|Type|Default|Description|
|-|-|-|-
|`trials`|`number`|`20`|Trial number|
|`congruentPct`|`number`|`50`|Percentage of trials that should be congruent (word matches ink color). The rest will be incongruent.|
|`iti`|`number`|`800`|Inter-trial interval in milliseconds – the pause between two consecutive stimuli.|
|`timeout`|`number`|`4000`|Maximum time (in ms) allowed for a response. If the user doesn’t respond within this window, the trial is marked as a timeout.|
|`track`|`string`|`ink`|Determines what the participant must identify: `"ink"` for the color of the text (standard Stroop test), or `"word"` to identify the written word.|


## Result Object Structure

|Key|Type|Description|
|-|-|-|
|`index`|`number`|Trial number|
|`word`|`string`|Displayed word|
|`ink`|`string`|the actual color the text is printed in|
|`type`|`string`|`"congruent"` or `"incongruent"`|
|`rt`|`number`|Reaction time in ms (if not timed out)|
|`correct`|`boolean`|Whether the response was correct|
|`timedOut`|`boolean`|`true` if user did not respond in time|