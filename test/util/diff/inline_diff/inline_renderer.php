<?php
/*
	file: inline_renderer.php

	This file is a modified renderer for the Text_Diff PEAR package.

	The inline_diff code was written by Ciprian Popovici in 2004,
	as a hack building upon the Text_Diff PEAR package.
	It is released under the GPL.

	There are 3 files in this package: inline_example.php, inline_function.php, inline_renderer.php
*/

	include_once 'Text/Diff/Renderer.php';
	class Text_Diff_Renderer_inline extends Text_Diff_Renderer {

	var $ins_prefix = '<div class="ins">';
	var $ins_suffix = '</div>';
	var $del_prefix = '<div class="del">';
	var $del_suffix = '</div>';
	
	function Text_Diff_Renderer_inline($context_lines = 10000, $ins_prefix = '<div class="ins">', $ins_suffix = '</div>', $del_prefix = '<div class="del">', $del_suffix = '</div>')
    {
		$this->$ins_prefix = $ins_prefix;
		$this->$ins_suffix = $ins_suffix;
		$this->$del_prefix = $del_prefix;
		$this->$del_suffix = $del_suffix;
		
        $this->_leading_context_lines = $context_lines;
        $this->_trailing_context_lines = $context_lines;
    }

    function _lines($lines)
    {
        $value="";
        foreach ($lines as $line) {
            $value.="$line ";
            // FIXME: don't output space if it's the last line.
        }
        return "<xmp>".$value."</xmp>";
    }

    function _blockHeader($xbeg, $xlen, $ybeg, $ylen)
    {
		return '';
    }

    function _startBlock($header)
    {
        return $header;
    }

    function _context($lines)
    {
          return $this->_lines($lines, '  ');
    }
    function _added($lines)
    {
        return  $this->ins_prefix.$this->_lines($lines).$this->ins_suffix;
    }

    function _deleted($lines)
    {
        return  $this->del_prefix.$this->_lines($lines).$this->del_suffix;
    }

    function _changed($orig, $final)
    {
        return "<p>".$this->_deleted($orig) ."</p><p>". $this->_added($final)."</p>";
    }

}
