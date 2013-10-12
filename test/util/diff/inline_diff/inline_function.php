<?php

/*
	file: inline_function.php

	This file defines a function which hacks two strings so they can be
	used by the Text_Diff parser, then recomposes a single string out of
	the two original ones, with inline diffs applied.

	The inline_diff code was written by Ciprian Popovici in 2004,
	as a hack building upon the Text_Diff PEAR package.
	It is released under the GPL.

	There are 3 files in this package: inline_example.php, inline_function.php, inline_renderer.php
*/

// for the following two you need Text_Diff from PEAR installed
include_once 'Text/Diff.php';
include_once 'Text/Diff/Renderer.php';
include_once 'Text/Diff/Renderer/unified.php';

// this is my own renderer
include_once 'inline_renderer.php';

function inline_diff($text1, $text2, $nl) {

	// create the hacked lines for each file
	$htext1 = chunk_split($text1, 1, "\n");
	$htext2 = chunk_split($text2, 1, "\n");

	// convert the hacked texts to arrays
	// if you have PHP5, you can use str_split:
	/*
	$hlines1 = str_split(htext1, 2);
	$hlines2 = str_split(htext2, 2);
	*/
	// otherwise, use this code
    $len1 = strlen($text1);
    $len2 = strlen($text2);
	for ($i=0;$i<$len1;$i++) {
		$hlines1[$i] = substr($htext1, $i*2, 2);
	}
	for ($i=0;$i<$len2;$i++) {
		$hlines2[$i] = substr($htext2, $i*2, 2);
	}
/*
	$text1 = str_replace("\n",$nl,$text1);
	$text2 = str_replace("\n",$nl,$text2);
*/
	$text1 = str_replace("\n"," \n",$text1);
	$text2 = str_replace("\n"," \n",$text2);

	$hlines1 = explode(" ", $text1);
	$hlines2 = explode(" ", $text2);

	// create the diff object

	$diff =  new Text_Diff($hlines1, $hlines2);
	// get the diff in unified format
	// you can add 4 other parameters, which will be the ins/del prefix/suffix tags
	$renderer = new Text_Diff_Renderer_inline(50000);
	return $renderer->render($diff);
}