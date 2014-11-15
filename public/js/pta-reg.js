
	var rowNum = 0;
	function addRow(frm) {
	rowNum ++;
	var row = '<p id="rowNum'+rowNum+'"><label>First Name:</label> <input type="text" name="student'+rowNum+'-firstName" ng-model="student'+rowNum+'-firstName" value="'+frm.studentFirstName.value+'"> <label>Last name:</label> <input type="text" name="student'+rowNum+'-lastName" ng-model="student'+rowNum+'-lastName" value="'+frm.studentLastName.value+'"> <input type="button" value="Remove" onclick="removeRow('+rowNum+');"></p>';
	$('#itemRows').append(row);
	frm.studentFirstName.value = '';
	frm.studentLastName.value = '';
	}


function removeRow(rnum) {
$('#rowNum'+rnum).remove();
}
