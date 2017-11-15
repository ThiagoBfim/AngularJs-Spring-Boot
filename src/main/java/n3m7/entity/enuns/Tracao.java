package n3m7.entity.enuns;

public enum Tracao {

	COMBUSTAO("Combustão"), ELETRICO("Elétrico");

	private String descricao;

	Tracao(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}

}
